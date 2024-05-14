import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto, RoleEnum } from '@ace/shared';
import { UpdateServiceDto } from '@ace/shared';
import { MailService } from './mail.service';
import { UsersService } from '../users/users.service';

@Controller('services')
export class ServicesController {
  constructor(
    private readonly servicesService: ServicesService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService
  ) {}

  private readonly logger = new Logger(ServicesController.name);

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    const provider = await this.usersService.findOne({
      id: createServiceDto.provider_id,
    });
    return this.servicesService.create(createServiceDto, provider);
  }

  @Get()
  findAll() {
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    const updatedService = this.servicesService.update(+id, updateServiceDto);
    return updatedService;
  }

  @Patch('validate/:id')
  async validate(@Param('id') id: string) {
    const updatedService = await this.servicesService.update(+id, {
      status: 'ONLINE',
    });

    const provider = await this.usersService.findOne({ id: updatedService.provider.id });
    if (!provider.roles.map(role => role.name).includes(RoleEnum.PROVIDER)) {
      this.usersService.update(updatedService.provider.id, {
        roles: [
          ...updatedService.provider.roles.map((role) => role.name),
          RoleEnum.PROVIDER,
        ],
      });
      this.logger.log(
        `Added PROVIDER role to user #${updatedService.provider.id}`
      );
    }

    await this.mailService.sendMail(
      updatedService.provider.email,
      `Service creation request for #${updatedService.id}`,
      `
      <h1>Your service has been validated ${updatedService.provider.firstname} !</h1>
      <p>After a thourough review your service creation request has been validated by an admin</p>
    `
    );

    this.logger.log(
      `Service validation email has been sent to ${updatedService.provider.email}`
    );
    return updatedService;
  }

  @Patch('invalidate/:id')
  async invalidate(@Param('id') id: string) {
    const updatedService = await this.servicesService.update(+id, {
      status: 'OFFLINE',
    });

    const provider = await this.usersService.findOne({ id: updatedService.provider.id });
    if (provider.services.length === 1) {
      this.usersService.update(updatedService.provider.id, {
        roles: [
          ...updatedService.provider.roles
            .map((role) => role.name)
            .filter((roleName) => roleName != RoleEnum.PROVIDER),
        ],
      });
      this.logger.log(
        `Removed PROVIDER role from user #${updatedService.provider.id}`
      );
    }

    await this.mailService.sendMail(
      updatedService.provider.email,
      `Service creation request for #${updatedService.id}`,
      `
      <h1>Your service has been refused ${updatedService.provider.firstname} :(</h1>
      <p>After a thourough review your service creation request has been invalidated by an admin</p>
    `
    );

    this.logger.log(
      `Service refusal email has been sent to ${updatedService.provider.email}`
    );
    return updatedService;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateInterventionDto, CreateReviewDTO, CreateServiceDto, RoleEnum } from '@ace/shared';
import { UpdateServiceDto } from '@ace/shared';
import { MailService } from './mail.service';
import { UsersService } from '../users/users.service';
import { LessThanOrEqual, MoreThanOrEqual } from 'typeorm';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

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
      where: { id: createServiceDto.providerId },
    });
    return this.servicesService.create(createServiceDto, provider);
  }

  @Get()
  findAll(@Query('from') from?: string, @Query('to') to?: string) { 
    if (from && to) {
      const fromParsed = from ? new Date(from) : null;
      const toParsed = to ? new Date(to) : null;
      return this.servicesService.findAll({
        where: {
          availabilities: {
            from: MoreThanOrEqual(fromParsed),
            to: LessThanOrEqual(toParsed),
          },
        },
      });
    }
    return this.servicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne({
      where: { id: +id },
    });
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

    const service = await this.servicesService.findOne({
      where: {
        id: updatedService.id
      }
    });

    console.log(updatedService);
    const provider = await this.usersService.findOne({
      where: {
        id: service.provider.id
      }
    });

    if (!provider.roles.map(role => role.name).includes(RoleEnum.PROVIDER)) {
      this.usersService.update(service.provider.id, {
        roles: [
          ...service.provider.roles.map((role) => role.name),
          RoleEnum.PROVIDER,
        ],
      });
      this.logger.log(
        `Added PROVIDER role to user #${service.provider.id}`
      );
    }

    await this.mailService.sendMail(
      service.provider.email,
      `Service creation request for #${service.id}`,
      `
      <h1>Your service has been validated ${service.provider.firstname} !</h1>
      <p>After a thourough review your service creation request has been validated by an admin</p>
    `
    );

    this.logger.log(
      `Service validation email has been sent to ${service.provider.email}`
    );
    return service;
  }

  @Patch('invalidate/:id')
  async invalidate(@Param('id') id: string) {
    const updatedService = await this.servicesService.update(+id, {
      status: 'OFFLINE',
    });

    const provider = await this.usersService.findOne({
      where: {
        id: updatedService.provider.id
      }
    });
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

  @Post(':id/reviews')
  @Roles(RoleEnum.LESSOR)
  @UseGuards(RolesGuard)
  async addReview(@Req() req: any, @Param('id') serviceId: number, @Body() createReviewDTO: CreateReviewDTO) {
    const user = await this.usersService.findOne(
      {
        where: {
          id: req['user'].sub
        }
      }
    );

    return this.servicesService.addReview(user, serviceId, createReviewDTO);
  }

  @Get(':id/reviews')
  @Roles(RoleEnum.LESSOR)
  @UseGuards(RolesGuard)
  async getReviews(@Req() req: any, @Param('id') propertyId: number) {
    const user = await this.usersService.findOne(
      {
        where: {
          id: req['user'].sub
        }
      }
    ); 

    return this.servicesService.getReviews(propertyId, user);
  }
}

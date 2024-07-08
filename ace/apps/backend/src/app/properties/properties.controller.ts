import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  forwardRef,
  Inject,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { CreateInventoryCheckDto, CreatePropertyDto, CreateReviewDTO, RoleEnum } from '@ace/shared';
import { UpdatePropertyDto } from '@ace/shared';
import { UsersService } from '../users/users.service';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@Controller('properties')
export class PropertiesController {

  logger = new Logger(PropertiesController.name);

  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    const lessor = await this.usersService.findOne({
      where : { id: createPropertyDto.lessorId }
    });
    const lessorRoles = lessor.roles.map(role => role.name);
    if (!lessorRoles.includes(RoleEnum.LESSOR)) {
      this.logger.log(`Adding Renter role to lessor ${lessor.email}`);
      await this.usersService.update(lessor.id, {roles: [...lessorRoles, RoleEnum.LESSOR]});
    }
    return this.propertiesService.create(createPropertyDto, lessor);
  }

  @Get()
  findAll() {
    return this.propertiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne({ id: +id });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto
  ) {
    return this.propertiesService.update(+id, updatePropertyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove({ id: +id });
  }

  @Post(':id/inventory-checks')
  async createInventoryCheck(
    @Param('id') propertyId: string,
    @Body() createInventoryCheckDto: CreateInventoryCheckDto
  ) {
    return this.propertiesService.createInventoryCheck(+propertyId, createInventoryCheckDto);
  }

  @Get(':id/inventory-checks')
  async getInventoryChecks(@Param('id') propertyId: string) {
    return this.propertiesService.getInventoryChecks(+propertyId);
  }

  @Post(':id/reviews')
  @Roles(RoleEnum.LESSOR)
  @UseGuards(RolesGuard)
  async addReview(@Req() req: any, @Param('id') propertyId: number, @Body() createReviewDTO: CreateReviewDTO) {
    const user = await this.usersService.findOne(
      {
        where: {
          id: req['user'].sub
        }
      }
    );

    return this.propertiesService.addReview(user, propertyId, createReviewDTO);
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

    return this.propertiesService.getReviews(propertyId, user);
  }
}

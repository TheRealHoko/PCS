import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, Logger } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { UsersService } from '../users/users.service';
import { RolesGuard } from '../roles/roles.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tickets')
@UseGuards(RolesGuard)
export class TicketsController {
  logger = new Logger(TicketsController.name);

  constructor(
    private readonly ticketService: TicketsService,
    private readonly usersService: UsersService
  ) {}

  @Post()
  async create(@Req() req: any, @Body() createFormDto: CreateTicketDto) {
    const user = await this.usersService.findOne({where: {id: req.user.sub}});
    return this.ticketService.create(createFormDto, user);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get('my-tickets')
  async findMyTickets(@Req() req: any) {
    this.logger.debug(`Finding tickets for user ${req.user.sub}`);
    const user = await this.usersService.findOne({where: {id: req.user.sub}});
    return this.ticketService.findMyTickets(user);
  }

  @Get('my-tickets/:id')
  async findMyTicket(@Req() req: any, @Param('id') id: string) {
    this.logger.debug(`Finding ticket ${id} for user ${req.user.sub}`);
    const user = await this.usersService.findOne({where: {id: req.user.sub}});
    return this.ticketService.findMyTicket(user, id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne({id: +id});
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove({id: +id});
  }

  @Patch(':id/assign/:assigneeId')
  assignTicket(@Param('id') id: string, @Param('assigneeId') assigneeId: string) {
    return this.ticketService.assignTicket(+id, +assigneeId);
  }

  @Post(':id/comment')
  async addComment(@Req() req: any, @Param('id') id: string, @Body() createCommentDto: CreateCommentDto) {
    const user = await this.usersService.findOne({where: {id: req.user.sub}});

    return this.ticketService.addComment(+id, createCommentDto, user);
  }
}

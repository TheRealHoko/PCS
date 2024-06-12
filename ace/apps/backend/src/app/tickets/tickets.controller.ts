import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Post()
  create(@Body() createFormDto: CreateTicketDto) {
    return this.ticketService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
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
}

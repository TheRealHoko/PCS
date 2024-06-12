import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>
  ){}

  async create(CreateticketDto: CreateTicketDto): Promise<Ticket> {
    const ticket = this.ticketRepository.create(CreateticketDto);
    return this.ticketRepository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async findOne(where: FindOptionsWhere<Ticket>): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ where });
    if (!ticket){
      throw new NotFoundException();
    }
    return ticket;
  }

  async update(id: number, updateticketDto: UpdateTicketDto): Promise<Ticket> {
    const ticket = await this.ticketRepository.preload({
      id: id,
      ...updateticketDto
    });
    if (!ticket) {
      throw new NotFoundException();
    }
    return this.ticketRepository.save(ticket);  
  }

  async remove(where: FindOptionsWhere<Ticket>): Promise<void> {
    const ticket = await this.ticketRepository.findOne({ where });
    if (!ticket){
      throw new NotFoundException();
    }  
    await this.ticketRepository.remove(ticket);
  }

  async assignTicket(id: number, assigneeId: number): Promise<Ticket> {
    const ticket = await this.ticketRepository.preload({
      id: id,
      assignee: { id: assigneeId }
    });
    if (!ticket) {
      throw new NotFoundException();
    }
    return this.ticketRepository.save(ticket);
  }
}

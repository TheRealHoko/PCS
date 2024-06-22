import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { User } from '../users/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ){}

  async create(CreateticketDto: CreateTicketDto, createdBy: User): Promise<Ticket> {
    const ticket = this.ticketRepository.create(CreateticketDto);
    ticket.createdBy = createdBy;
    return this.ticketRepository.save(ticket);
  }

  findAll(): Promise<Ticket[]> {
    return this.ticketRepository.find({relations: ['comments', 'comments.sent_by']});
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
    console.log("id: " + id);
    const ticket = await this.ticketRepository.preload({
      id: id,
      assignee: { id: assigneeId }
    });

    console.log("ticket: " + ticket);
    if (!ticket) {
      throw new NotFoundException();
    }
    return this.ticketRepository.save(ticket);
  }

  async addComment(id: number, createCommentDto: CreateCommentDto, user: User): Promise<any> {
    const ticket = await this.ticketRepository.findOne({ where: { id }, relations: ['comments']});

    if (!ticket) {
      throw new NotFoundException();
    }

    const comment = this.commentRepository.create(createCommentDto);
    comment.ticket = ticket;
    comment.sent_by = user;
    console.log(comment);
    ticket.comments.push(comment);

    const savedTicket = await this.ticketRepository.save(ticket);

    return classToPlain(savedTicket);
  }

  async findMyTickets(user: User): Promise<Ticket[]> {
    return this.ticketRepository.find({
      where: [
        { createdBy: user },
      ],
      relations: ['comments', 'comments.sent_by']
    });
  }

  async findMyTicket(user: User, id: string): Promise<Ticket> {
    return this.ticketRepository.findOne({
      where: [
        {
          id: +id,
          createdBy: user
        },
      ],
      relations: ['comments', 'comments.sent_by']
    });
  }
}

import { Ticket } from "./ticket.dto";
import { User } from "./user.dto";

export class Comment {
    id!: number;

    content!: string;

    created_at!: Date;

    updated_at!: Date;

    ticket!: Ticket;

    sent_by!: User;
}
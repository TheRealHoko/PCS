import { Ticket } from "./ticket.interface";
import { IUser } from "./user.interface";

export interface Comment {
    id: number;

    content: string;

    created_at: Date;

    updated_at: Date;

    ticket: Ticket;

    sent_by: IUser;
}
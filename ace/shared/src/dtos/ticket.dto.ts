import { Comment } from "./comment.dto";
import { User } from "./user.dto";

export class Ticket {
    id!: number;
    created_at!: Date;
    updated_at!: Date;
    topic!: string;
    description!: string;
    isSolved!: boolean;
    createdBy!: User;
    assignee!: User;
    comments!: Comment[];
}
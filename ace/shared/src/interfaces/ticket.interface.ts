import { Comment } from "./comment.interface";
import { IUser } from "./user.interface";

export interface Ticket {
    id: number;

    topic: string;

    description: string;

    isSolved: boolean;

    createdBy: IUser;

    assignee: IUser;

    comments: Comment[];
}

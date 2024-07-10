import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../environments/environment";
import { Ticket } from "shared/src/dtos/ticket.dto";
import { Comment } from "@ace/shared";

@Injectable({
    providedIn: 'root'
})
export class TicketsService {
    http = inject(HttpClient);

    getMyTickets() {
        return this.http.get<Ticket[]>(`${environment.apiUrl}/api/tickets/my-tickets`);
    }

    getMyTicket(id: number) {
        return this.http.get<Ticket>(`${environment.apiUrl}/api/tickets/my-tickets/${id}`);
    }

    addComment(ticketId: number, content: string) {
        return this.http.post<Comment>(`${environment.apiUrl}/api/tickets/${ticketId}/comment`, { content: content });
    }

    createTicket(topic: string, description: string) {
        return this.http.post<Ticket>(`${environment.apiUrl}/api/tickets`, {topic: topic, description: description});
    }
}
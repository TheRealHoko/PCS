import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsService } from '../../../services/tickets.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Comment, Ticket } from '@ace/shared';

@Component({
  selector: 'ace-ticket-view',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.css',
})
export class TicketViewComponent {
  ticketsService = inject(TicketsService);
  route = inject(ActivatedRoute);
  fb = inject(FormBuilder);
  ticket: Ticket | undefined;
  commentForm: FormGroup;

  constructor() {
    this.commentForm = this.fb.group({
      comment: new FormControl('', Validators.required)
    });

    this.route.paramMap.pipe(
      switchMap(params => {
        return this.ticketsService.getMyTicket(+params.get('id')!);
      })
    ).subscribe((ticket: Ticket) => {
      console.log(ticket);
      this.ticket = ticket;
    });
  }

  onCommentSubmit() {
    if (this.commentForm.valid) {
      if (this.ticket?.id) {
        this.ticketsService.addComment(this.ticket?.id, this.commentForm.value.comment)
        .subscribe((comment: Comment) => {
          this.ticket?.comments.push(comment);
        });
        console.log(this.commentForm.value);
      }
    }
  }
}

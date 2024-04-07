import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  /**
   * find a way to apply custom style
   * @param message
   */
  info(message: string) {
    this.snackBar.open(message, 'Dismiss');
  }
}
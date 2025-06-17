import { Component, inject } from "@angular/core";
import { TransactionService } from "./transaction.service";
import { MatGridListModule } from "@angular/material/grid-list";

@Component({
  selector: "app-transaction-history",
  providers: [TransactionService],
  imports: [MatGridListModule],
  template: `
    <!-- @if (!loading() && !error()) { -->
    <h1>Recent Operations</h1>
    <mat-grid-list cols="5" rowHeight="4:1">
      @for (transaction of transactions(); track transaction.id) {

      <mat-grid-tile>{{ transaction.title }}</mat-grid-tile>
      <mat-grid-tile>{{ transaction.date }}</mat-grid-tile>
      <mat-grid-tile>{{ transaction.category }} </mat-grid-tile>
      <mat-grid-tile>
        @if (transaction.type === "Income") { "+" } @else { "-" }

        {{ transaction.amount }}</mat-grid-tile
      >
      <mat-grid-tile>{{ transaction.currency }}</mat-grid-tile>
      }
    </mat-grid-list>
    <!-- } @else if (loading()) {
      <mat-spinner [diameter]="20" />
    } @else {
      <p>{{ error()?.code }}</p>
    } -->
  `,
  styleUrl: "./transaction-history.css",
})
export class TransactionHistory {
  service = inject(TransactionService);
  transactions = this.service.transactions;
}

import { Component, inject } from "@angular/core";
import { TransactionsService } from "./transactions.service";
import { RouterLink } from "@angular/router";
import { toSignal } from "@angular/core/rxjs-interop";
import { DatePipe } from "@angular/common";
import { TransactionType } from "./model/TransactionType";

@Component({
  selector: "app-transactions-widget",
  template: `
    <header class="flex items-center justify-between mb-4">
      <h2>Ostatnie operacje</h2>
      <a class="text-indigo-500" routerLink="/transaction/new">Nowy przelew</a>
    </header>
    @for (transaction of transactions(); track transaction.id) {
      <div
        class="grid grid-cols-[3fr_1fr_1fr_1fr] gap-x-4 items-center py-3 px-4"
      >
        <p class="font-semibold">{{ transaction.title }}</p>
        <p class="text-gray-600">{{ transaction.date | date }}</p>
        <p class="text-gray-600  ">{{ transaction.category }}</p>
        <p
          [class.text-red-500]="transaction.type === transactionType.Expense"
          [class.text-green-500]="transaction.type === transactionType.Income"
          class="text-gray-600 text-right"
        >
          @if (transaction.type === transactionType.Income) {
            +
          } @else {
            -
          }
          {{ transaction.amount }}{{ transaction.currency }}
        </p>
      </div>
    }
  `,

  imports: [RouterLink, DatePipe],
})
export class TransactionsWidgetComponent {
  service = inject(TransactionsService);

  transactionType = TransactionType;

  transactions = toSignal(this.service.getAll());

  ngOnInit() {
    this.service.getAll().subscribe(console.log);
  }
}

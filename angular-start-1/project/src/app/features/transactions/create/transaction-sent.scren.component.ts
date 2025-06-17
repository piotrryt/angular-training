import { Component, input } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-transaction-sent",
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center h-full">
      <div
        class="flex flex-col items-center bg-white p-16 rounded-lg shadow-md"
      >
        <h1 class="text-2xl font-bold mb-4">
          Przelew na konto {{ accountNumber() }} został wysłany!
        </h1>
        <p class="text-gray-600 mb-6">
          Dziękujemy za skorzystanie z naszego serwisu.
        </p>
        <a
          routerLink="/transactions"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Zobacz swoje przelewy
        </a>
      </div>
    </div>
  `,
})
export class TransactionSentScreenComponent {
  accountNumber = input<string>();
}

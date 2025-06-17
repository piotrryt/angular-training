import { HttpClient } from "@angular/common/http";
import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { Transaction } from "../model/Transaction";
import { API_URL } from "../../../app.config";

@Injectable()
export class TransactionService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  #transactions = signal<Transaction[]>([]);

  e = effect(() => {
    this.getAll().subscribe({ next: (resp) => this.#transactions.set(resp) });
    this.correctSignum();
  });

  getAll() {
    return this.http.get<Transaction[]>(`${this.API_URL}/transactions`);
  }
  correctSignum() {
    this.#transactions.update((value) => {
      return value.map((c) => {
        console.log(c);
        if (c.type === "Expense") {
          console.log(c);
          return { ...c, amount: c.amount * -1 };
        } else {
          return c;
        }
      });
    });
  }

  transactions = this.#transactions.asReadonly();
}

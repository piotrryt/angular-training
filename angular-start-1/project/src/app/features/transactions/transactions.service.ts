import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { TransactionSchema } from "./contract/transaction.schema";
import { validate } from "@utils/validate.rxjs";

@Injectable({
  providedIn: "root",
})
export class TransactionsService {
  http = inject(HttpClient);

  getAll() {
    return this.http
      .get("http://localhost:3000/transactions", { observe: "response" }) // Ensure we get the full response, not only JSON body
      .pipe(validate(TransactionSchema)); // runtime validation
  }

  addTransaction(transaction: unknown) {
    return this.http
      .post("http://localhost:3000/transactions", transaction, {
        observe: "response",
      })
      .pipe(validate(TransactionSchema));
  }
}

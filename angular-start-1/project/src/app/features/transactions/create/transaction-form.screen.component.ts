import { Component } from "@angular/core";
import { TransactionFormComponent } from "./transaction-form.component";

@Component({
  selector: "app-transaction-form-screen",
  template: ` <div class="p-4 rounded-lg bg-white shadow-md">
    <app-transaction-form />
  </div>`,
  imports: [TransactionFormComponent],
})
export class TransactionFormScreenComponent {}

import { Component, inject } from "@angular/core";
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-transaction-form",
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" class="space-y-4" (ngSubmit)="send()">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700"
          >Odbiorca</label
        >
        <input
          formControlName="name"
          id="name"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        @let name = form.controls.name;
        @if (name.invalid && name.touched) {
          <p class="text-red-500 text-sm mt-1">
            Nazwa musi mieć co najmniej
            {{ minNameLength }} znaki.
          </p>
        }
      </div>
      <div class="mb-4">
        <label for="account" class="block text-sm font-medium text-gray-700"
          >Numer konta</label
        >
        <input
          formControlName="accountNumber"
          id="account"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        @let accountNumber = form.controls.accountNumber;
        @if (accountNumber.invalid && accountNumber.touched) {
          <p class="text-red-500 text-sm mt-1">
            Numer konta musi mieć
            {{ minAccountNumberLength }} znaków.
          </p>
        }
      </div>
      <div class="mb-4">
        <label for="amount" class="block text-sm font-medium text-gray-700"
          >Kwota</label
        >
        <input
          formControlName="amount"
          id="amount"
          type="number"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        @let amount = form.controls.amount;
        @if (amount.invalid && amount.touched) {
          <p class="text-red-500 text-sm mt-1">
            Wartość przelewu to conajmniej
            {{ minAmountValue }} PLN.
          </p>
        }
      </div>
      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700"
          >Tytułem</label
        >
        <input
          formControlName="title"
          id="description"
          type="text"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        @let title = form.controls.title;
        @if (title.invalid && title.touched) {
          <p class="text-red-500 text-sm mt-1">Musisz wypełnić te pole</p>
        }
      </div>
      <div class="mb-4">
        <label for="date" class="block text-sm font-medium text-gray-700"
          >Data transakcji</label
        >
        <input
          [min]="minDate"
          formControlName="date"
          id="date"
          type="date"
          class="mt-1 block
                w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        @let date = form.controls.date;
        @if (date.invalid && date.touched) {
          <p class="text-red-500 text-sm mt-1">Data przelewu jest wymagana</p>
        }
      </div>

      <button
        type="submit"
        class="px-4 py-2 bg-indigo-500 font-semibold
                text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Wyślij przelew
      </button>
    </form>
  `,

  styles: [
    `
      .ng-invalid.ng-touched:not(form) {
        border: 1px solid red;
      }
    `,
  ],
})
export class TransactionFormComponent {
  http = inject(HttpClient);
  private router = inject(Router);
  fb = inject(NonNullableFormBuilder);

  minNameLength = 2;
  minAccountNumberLength = 26;
  minAmountValue = 0.01;
  minDate = new Intl.DateTimeFormat("en-CA").format(new Date());

  form = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(this.minNameLength)]],
    title: ["", [Validators.required]],
    accountNumber: [
      "",
      [
        Validators.required,
        Validators.minLength(this.minAccountNumberLength),
        Validators.maxLength(this.minAccountNumberLength),
      ],
    ],
    amount: [0, [Validators.required, Validators.min(this.minAmountValue)]],
    date: [
      new Intl.DateTimeFormat("en-CA").format(new Date()),
      [Validators.required],
    ],
  });

  send() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.http
      .post("http://localhost:3000/transactions", {
        ...this.form.value,
      })
      .subscribe(() => {
        this.router.navigate(["/transaction", "sent"], {
          queryParams: {
            accountNumber: this.form.value.accountNumber,
          },
        });
      });
  }
}

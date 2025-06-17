import { Routes } from "@angular/router";
import { delay, of } from "rxjs";
import { Overview } from "./overview/overview";
import { TransactionHistory } from "./transaction/transaction-history/transaction-history";

export const routes: Routes = [
  {
    path: "overview",
    component: Overview,
  },
  {
    path: "history",
    component: TransactionHistory,
  },
  //   {
  //     path: "**",
  //     redirectTo: "characters",
  //   },
];

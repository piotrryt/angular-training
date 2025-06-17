import { Routes } from "@angular/router";
import { delay, of } from "rxjs";
import { Overview } from "./overview/overview";

export const routes: Routes = [
  {
    path: "overview",
    component: Overview,
  },
  //   {
  //     path: "**",
  //     redirectTo: "characters",
  //   },
];

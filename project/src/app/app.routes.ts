import { Routes } from "@angular/router";
import { Overview } from "./features/overview/overview";
import { MainComponent } from "./features/main.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    loadChildren: () => import("./features/main.routes").then((m) => m.routes),
  },
  // {
  //   path: "overview",
  //   component: Overview,
  //   // loadComponent: () =>
  //   //   import("./features/overview/overview").then((m) => m.Overview),
  // },
  //   {
  //     path: "",
  //     redirectTo: "overview",
  //   },
  {
    path: "**",
    redirectTo: "",
  },
];

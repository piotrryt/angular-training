import { Routes } from "@angular/router";
import { Overview } from "./features/overview/overview";
import { MainComponent } from "./features/main.component";

export const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    loadChildren: () => import("./features/main.routes").then((m) => m.routes),
  },

  {
    path: "**",
    redirectTo: "",
  },
];

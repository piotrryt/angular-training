import { Routes } from "@angular/router";
import { ShellComponent } from "./shell.component";

export const routes: Routes = [
  {
    path: "",
    component: ShellComponent,
    loadChildren: () =>
      import("./features/features.routes").then((m) => m.featuresRoutes),
  },
];

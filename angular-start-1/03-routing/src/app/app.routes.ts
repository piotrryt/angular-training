import { Routes } from "@angular/router";
import { Auth } from "./auth/auth";
import { ShellComponent } from "./features/shell.component";
import { authGuard } from "./auth/auth.guard";

export const routes: Routes = [
  {
    path: "auth",
    component: Auth,
  },
  {
    path: "",
    component: ShellComponent,
    canMatch: [authGuard],
    data: {
      role: 1,
    },
    loadChildren: () =>
      import("./features/features.routes").then((m) => m.routes),
  },
  {
    path: "**",
    redirectTo: "auth",
  },
];

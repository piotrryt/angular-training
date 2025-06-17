export const featuresRoutes = [
  {
    path: "dashboard",
    data: { title: "Dashboard" },
    loadComponent: () =>
      import("./dashboard/dashboard.screen.component").then(
        (m) => m.DashboardScreenComponent,
      ),
  },
  {
    path: "transaction/new",
    data: { title: "Nowy przelew" },
    loadComponent: () =>
      import("./transactions/create/transaction-form.screen.component").then(
        (m) => m.TransactionFormScreenComponent,
      ),
  },
  {
    path: "transaction/sent",
    data: { title: "" },
    loadComponent: () =>
      import("./transactions/create/transaction-sent.scren.component").then(
        (m) => m.TransactionSentScreenComponent,
      ),
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];

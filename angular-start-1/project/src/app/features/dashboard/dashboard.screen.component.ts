import { Component } from "@angular/core";
import { TransactionsWidgetComponent } from "../transactions/transactions-widget.component";
import { WidgetContainerComponent } from "./widget-container.component";

@Component({
  selector: "app-dashboard",
  template: `
    <app-widget-container>
      <app-transactions-widget />
    </app-widget-container>
  `,
  imports: [TransactionsWidgetComponent, WidgetContainerComponent],
})
export class DashboardScreenComponent {
  // You can add any additional logic or properties here if needed
}

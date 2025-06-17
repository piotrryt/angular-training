import { Component } from "@angular/core";

@Component({
  selector: "app-widget-container",
  template: `
    <div class="p-4  rounded-lg bg-white shadow-md">
      <ng-content></ng-content>
    </div>
  `,
})
export class WidgetContainerComponent {}

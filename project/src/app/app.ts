import { Component, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: "app-root",
  imports: [MatIconModule],
  template: `
    <h1 class="text-3xl font-bold">
      <mat-icon fontIcon="emoji_people"></mat-icon>
      {{ title() }}
    </h1>
  `,
})
export class App {
  title = signal("Overview");
}

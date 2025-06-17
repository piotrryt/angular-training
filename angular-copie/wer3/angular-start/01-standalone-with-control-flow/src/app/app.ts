import { Component, computed, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FirstComponent } from "./first.component";

@Component({
  selector: "app-root",
  imports: [MatIconModule, FirstComponent],
  // templateUrl: "./app.html",
  template: `
    <h1 class="text-3xl font-bold">
      <mat-icon fontIcon="emoji_people"></mat-icon>
      {{ title() }}
    </h1>
    <app-first [text]="firstCmpText()" />

    <button (click)="toggle()">Toggle</button>
    @if (showSecondFirst()) {
    <app-first />
    } @else { ... } @switch (title()) {@case(''){} @default {}} @for (item of
    array(); track $index) {

    <p [class.bg-amber-500]="$even">{{ item }},{{ $even }},{{ $index }}</p>
    } @empty {
    <p>czysto</p>
    }
  `,
  styles: [
    `
      /* style sa enkapsulowane dla danego komponentu */
      h1 {
        color: peru;
      }
    `,
  ],
})
export class App {
  title = signal(" Hello world!!!!!");

  showSecondFirst = signal(false);

  computedExample = computed(() => {
    return this.title().toUpperCase();
  });

  firstCmpText = signal("Different...");
  array = signal([1, 2, 3, 4, 5]);

  toggle() {
    this.title.set("Ddif");
    this.array.set([]);
    this.showSecondFirst.update((value) => {
      return !value;
    });
  }

  getTitle() {
    return "Hello universe";
  }
}

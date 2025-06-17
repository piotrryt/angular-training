import { Component, computed, signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FirstComponent } from "./first.component";
import { NgIf } from "@angular/common";

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
    } @else { ... }
    <!--  -->
    @for(item of array(); track $index) {
    <!-- $even, $odd, $last, $first -->

    <p [class.bg-amber-500]="$even">{{ item }}, {{ $index }}, {{ $even }}</p>
    } @empty {
    <p>Brak wyników</p>
    }

    <!--  -->

    @switch(title()) { @case('') { } @default() { } }
    <!--  -->

    @let variable = array.length * 5;

    {{ variable }}

    <p>{{ titleUpperCased() }}</p>
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

  array = signal([1, 2, 3, 4, 5]);

  titleUpperCased = computed(() => {
    return this.title().toUpperCase();
  });

  firstCmpText = signal("Different...");

  toggle() {
    this.title.set("Diff");
    this.array.set([]);
    // this.showSecondFirst.set(!this.showSecondFirst());
    this.showSecondFirst.update((value) => {
      return !value;
    });
    // this.showSecondFirst = ;
  }

  getTitle() {
    return "Hello universe";
  }
}

import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FirstComponent } from "./first.component";
import { NgIf } from "@angular/common";
import { CharactersList } from "./characters-list/characters-list";
import { CharactersListService } from "./characters-list/characters-list.service";

@Component({
  selector: "app-root",
  imports: [MatIconModule, FirstComponent, CharactersList],
  // templateUrl: "./app.html",
  template: ` <app-characters-list /> `,
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
  // service = inject(CharactersListService);
  title = signal(" Hello world!!!!!");

  showSecondFirst = signal(false);

  array = signal([1, 2, 3, 4, 5]);

  titleUpperCased = computed(() => {
    return this.title().toUpperCase();
  });

  e = effect(() => {
    this.title();

    console.log(123);
  });

  ls = linkedSignal(() => {
    return this.title().toUpperCase();
  });

  ls2 = linkedSignal({
    source: () => {
      return {
        title: this.title(),
        showSecondFirst: this.showSecondFirst(),
      };
    },
    computation: (source, prev) => {
      prev?.source;
      prev?.value;
    },
  });

  firstCmpText = signal("Different...");

  toggle() {
    const title = this.title(); // tutaj tylko 1 wyciagamy wartosc!

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

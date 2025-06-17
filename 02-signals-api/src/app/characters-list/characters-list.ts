import { HttpClient, httpResource } from "@angular/common/http";
import {
  Component,
  computed,
  inject,
  linkedSignal,
  resource,
  signal,
} from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { delay } from "rxjs";
import { Character } from "./model/Character";
import { CharacterResponse } from "./model/CharacterResponse";
import { CharactersListService } from "./characters-list.service";

@Component({
  selector: "app-characters-list",
  providers: [CharactersListService],
  imports: [],
  template: `
    <p>Alive count: {{ aliveFromResource() }}</p>
    @if (charactersResource.isLoading()) {
    <p>Loading...</p>
    }
    <!--  -->
    @else { @let response = charactersResource.value(); @if(!response) { } @else
    { @for (character of response.results; track character.id) {
    <div class="flex gap-2">
      <img class="h-24" [src]="character.image" />
      <p>{{ character.name }}</p>

      @if (character.status === 'Alive') {
      <button class="bg-amber-300" (click)="markAsDead(character)">
        Mark as dead
      </button>
      }
    </div>
    } } }

    <hr />

    <p>Alive count: {{ alive() }}</p>
    <!--  -->
    @if (characters().length) {
    <!--  -->
    @for (character of characters(); track character.id) {
    <div class="flex gap-2">
      <img class="h-24" [src]="character.image" />
      <p>{{ character.name }}</p>

      @if (character.status === 'Alive') {
      <button class="bg-amber-300" (click)="markAsDead(character)">
        Mark as dead
      </button>
      }
    </div>
    }
    <!--  -->
    } @else {
    <p>Loading...</p>
    }
  `,
  styles: ``,
})
export class CharactersList {
  service = inject(CharactersListService);
  characters = this.service.characters;

  params = signal({
    page: 1,
  });

  hr = httpResource(
    () =>
      `https://rickandmortyapi.com/api/character?page=${this.params().page}`,
    {
      defaultValue: {},
    }
  );

  charactersResource = resource({
    params: this.params,
    loader: (params) => this.service.getAll(),
  });

  aliveFromResource = computed(() => {
    this.charactersResource.status;
    const characters = this.charactersResource.value();

    if (!characters) {
      return null;
    }

    return characters.results.filter(
      (character) => character.status === "Alive"
    ).length;
  });

  alive = computed(() => {
    const characters = this.characters();

    if (!characters) {
      return null;
    }

    return characters.filter((character) => character.status === "Alive")
      .length;
  });

  statuses = computed(() => {}); // -> {alive, dead, unknown}

  isReady = computed(() => {
    return Boolean(this.alive());
  });

  markAsDead(character: Character) {
    // patch request
    // this.service.markAsDead(character);

    this.charactersResource.update((v) => {
      if (!v) {
        return v;
      }

      return {
        ...v,
        results: v.results.map((c) => {
          if (c.id === character.id) {
            return { ...c, status: "Dead" };
          } else {
            return c;
          }
        }),
      };
    });
  }

  // constructor() {
  //   this.http
  //     .get("https://rickandmortyapi.com/api/character")
  //     .subscribe((response) => {
  //       this.characters.set(response);
  //       console.log(response);
  //     });
  // }
}

import { inject, Injectable, linkedSignal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { catchError, delay, of } from "rxjs";
import { CharacterResponse } from "./model/CharacterResponse";
import { HttpClient } from "@angular/common/http";
import { Character } from "./model/Character";

@Injectable()
export class CharactersListService {
  private http = inject(HttpClient);
  private characterResponse = toSignal(
    this.http
      .get<CharacterResponse>("https://rickandmortyapi.com/api/character")
      .pipe(delay(2000))
  );

  #characters = linkedSignal(() => {
    const response = this.characterResponse();

    return response ? response.results : [];
  });

  characters = this.#characters.asReadonly();

  getAll(): Promise<CharacterResponse> {
    return fetch("https://rickandmortyapi.com/api/character").then((res) =>
      res.json()
    );
    // return this.http.get<CharacterResponse>(
    //   "https://rickandmortyapi.com/api/character"
    // );
  }

  markAsDead(character: Character) {
    // patch request

    this.#characters.update((value) => {
      return value.map((c) => {
        if (c.id === character.id) {
          return { ...c, status: "Dead" };
        } else {
          return c;
        }
      });
    });
  }
}

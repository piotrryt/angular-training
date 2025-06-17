import { effect, inject, Injectable, signal } from "@angular/core";
import { delay } from "rxjs";
import { CharacterResponse } from "./model/CharacterResponse";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Character } from "./model/Character";
import { API_URL } from "../../app.config";

type CharacterListParams = {
  name: string;
  page: number;
  gender: Character["gender"] | "";
  status: Character["status"] | "";
  type: string;
  species: string;
};

@Injectable()
export class CharactersListService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  #characters = signal<Character[]>([]);
  #error = signal<{ code: number } | null>(null);
  #loading = signal(false);

  #params = signal<CharacterListParams>({
    page: 1,
    gender: "",
    status: "",
    type: "",
    species: "",
    name: "",
  });

  e = effect(() => {
    this.#error.set(null);
    this.#loading.set(true);

    this.getAll(this.#params()).subscribe({
      next: (response) => {
        console.log({ response });
        this.#characters.set(response.results);
        this.#loading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        this.#error.set({ code: err.error.code });
        this.#loading.set(false);
      },
    });
  });

  getAll(params: CharacterListParams) {
    return this.http
      .get<CharacterResponse>(`${this.API_URL}/character`, {
        params: new HttpParams({ fromObject: params }),
      })
      .pipe(delay(1500));
  }

  characters = this.#characters.asReadonly();
  params = this.#params.asReadonly();
  error = this.#error.asReadonly();
  loading = this.#loading.asReadonly();

  updateParams(params: Partial<CharacterListParams>) {
    this.#params.update((p) => {
      return {
        ...p,
        ...params,
      };
    });
  }

  markAsDead(character: Character) {
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

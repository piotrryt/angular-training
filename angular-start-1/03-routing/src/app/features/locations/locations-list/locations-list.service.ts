import { effect, inject, Injectable, signal } from "@angular/core";
import { delay } from "rxjs";
import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from "@angular/common/http";
import { Location } from "../model/Location";
import { ListApiResponse } from "../../../shared/http/ListApiResponse";

type LocationsListParams = {
  page: number;
};

@Injectable()
export class LocationsListService {
  private http = inject(HttpClient);

  #locations = signal<Location[]>([]);

  #params = signal<LocationsListParams>({
    page: 1,
  });

  e = effect(() => {
    this.getAll(this.#params()).subscribe({
      next: (response) => {
        this.#locations.set(response.results);
      },
      error: (err: HttpErrorResponse) => {
        // todo
      },
    });
  });

  getAll(params: LocationsListParams) {
    // todo: prepare valibot validation example
    return this.http
      .get<ListApiResponse<Location>>(
        "https://rickandmortyapi.com/api/location",
        {
          params: new HttpParams({ fromObject: params }),
        },
      )
      .pipe(delay(1500));
  }

  locations = this.#locations.asReadonly();
  params = this.#params.asReadonly();

  updateParams(params: Partial<LocationsListParams>) {
    this.#params.update((p) => {
      return {
        ...p,
        ...params,
      };
    });
  }
}

import { HttpClient } from "@angular/common/http";
import { Component, effect, inject, input, signal } from "@angular/core";
import { Location } from "../model/Location";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-location-details",
  imports: [],
  template: `
    <p>{{ location()?.name }}</p>
    <p>{{ location()?.dimension }}</p>
  `,
  styles: ``,
})
export class LocationDetails {
  http = inject(HttpClient);

  id = input<string>();
  name = input();

  e = effect(() => {
    const id = this.id();

    if (!id) return;

    this.http
      .get<Location>(`https://rickandmortyapi.com/api/location/${this.id()}`)
      .subscribe((response) => {
        this.location.set(response);
      });
  });

  location = signal<Location | undefined>(undefined);

  ngOnInit() {}

  ngOnDestroy() {
    console.log("destroyed");
  }
}

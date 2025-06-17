import { Routes } from "@angular/router";
import { delay, of } from "rxjs";

export const routes: Routes = [
  {
    path: "characters",
    loadComponent: () =>
      import("./characters-list/characters-list").then((m) => m.CharactersList),
  },
  {
    path: "locations",
    providers: [],
    resolve: {
      // resolve example
      fromResolve: () => {
        return of(1001).pipe(delay(10));
      },
    },
    loadComponent: () =>
      import("./locations/locations.screen").then((m) => m.LocationsScreen),
  },
  {
    path: "locations/:id",
    loadComponent: () =>
      import("./locations/location-details/location-details").then(
        (m) => m.LocationDetails,
      ),
  },
  {
    path: "**",
    redirectTo: "characters",
  },
];

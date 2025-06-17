import { Component, inject } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LocationsListService } from "./locations-list.service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-locations-list",
  providers: [LocationsListService],
  imports: [MatProgressSpinnerModule, RouterLink],
  template: `
    @if (locations().length) {
      @for (location of locations(); track location.id) {
        <a
          [routerLink]="location.id.toString()"
          class="flex gap-2 items-center"
        >
          <p>{{ location.name }}</p>
        </a>
      }
    } @else {
      <mat-spinner [diameter]="20" />
    }
  `,
})
export class LocationsList {
  service = inject(LocationsListService);
  locations = this.service.locations;
}

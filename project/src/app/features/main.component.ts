import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-main.component",
  imports: [MatSidenavModule, RouterLink, RouterOutlet],
  template: `<mat-drawer-container
    class="example-container"
    style="height: 200px;"
  >
    <mat-drawer mode="side" opened>
      <p>EasyBank</p>
      <a routerLink="overview">Overview</a>
    </mat-drawer>
    <mat-drawer-content
      >Main content
      <router-outlet />
    </mat-drawer-content>
  </mat-drawer-container>`,
})
export class MainComponent {}

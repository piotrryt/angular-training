import { Component } from "@angular/core";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterLink, RouterOutlet } from "@angular/router";
import { Overview } from "./overview/overview";

@Component({
  selector: "app-main.component",
  imports: [MatSidenavModule, RouterLink, RouterOutlet, Overview],
  template: `<mat-drawer-container
    class="example-container"
    style="height:600px;border: 1px solid #555;"
  >
    <mat-drawer mode="side" opened style="border: 1px solid #555; width: auto;">
      <p>EasyBank</p>
      <p><a routerLink="">Overview</a></p>
      <p><a routerLink="">Payments</a></p>
      <p><a routerLink="history">History</a></p>
      <p><a routerLink="">Wallet</a></p>
      console.log(c);
      <p><a routerLink="">Statistics</a></p>
    </mat-drawer>
    <mat-drawer-content
      ><app-overview />
      <router-outlet />
    </mat-drawer-content>
  </mat-drawer-container>`,
})
export class MainComponent {}

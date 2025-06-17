import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { FirstComponent } from "./first.component";

@Component({
  selector: "app-root",
  imports: [MatIconModule, FirstComponent],
  // templateUrl: "./app.html",
  template: `
    <h1 class="text-3xl font-bold text-amber-700">
      <mat-icon fontIcon="emoji_people"></mat-icon>Hello world! {{ title }}
      {{ getTitle() }}
    </h1>
    <!-- control flow -->
    <button (click)="toggle()">Toggle</button>
    @if(show) {
    <!-- default  -->
    <app-first />
    } @else {...}
    <!-- wartość wprost -->
    <app-first text="one" />
    <!-- jako wartość ze zmiennej z klasy -->
    <app-first [text]="hhhh" />
  `,
  styles: [],
})
export class App {
  // typowana zmiannna
  //title:string = "znaczy  cześć ";
  //typowana przez wartość

  title = "znaczy  cześć ";

  hhhh = "anotherone ";
  getTitle() {
    return "jakaś wartość ";
  }

  show = false;
  toggle() {
    this.show = !this.show;
  }
}

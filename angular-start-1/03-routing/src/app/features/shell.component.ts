import { Component } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="bg-blue-900 text-white py-2 px-4 flex gap-4">
      <a routerLink="characters">Characters</a>
      <a routerLink="locations">Locations</a>
    </header>
    <main class="p-4">
      <router-outlet />
    </main>
  `,
  styles: [``],
})
export class ShellComponent {}

import { Component, inject, signal } from "@angular/core";
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { filter, map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-shell",
  imports: [RouterOutlet, MatIconModule, RouterLink],
  template: `
    <div class="flex h-screen">
      <aside class="bg-indigo-500 text-white p-4 min-w-24">
        <nav>
          <ul>
            <li>
              <a routerLink="/dashboard" class="flex text-white hover:underline"
                ><mat-icon fontIcon="dashboard" class="mr-1" />Dashboard</a
              >
            </li>

            <li class="mt-12">
              <a
                routerLink="/transaction/new"
                class="flex text-white hover:underline"
                ><mat-icon fontIcon="add" class="mr-1" />Nowy przelew</a
              >
            </li>
          </ul>
        </nav>
      </aside>
      <section class="flex flex-col flex-1 px-8 bg-gray-200">
        <header class="py-4">
          <h1 class="text-2xl">{{ title() }}</h1>
        </header>
        <main class="flex-1 p-4bg-gray-100 ">
          <router-outlet />
        </main>
      </section>
    </div>
  `,
})
export class ShellComponent {
  private activatedRoute = inject(ActivatedRoute);
  title = toSignal(
    inject(Router).events.pipe(
      filter((event) => {
        return event instanceof NavigationEnd;
      }),
      map(() => {
        let route = this.activatedRoute.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route.snapshot.data["title"];
      })
    ),
    { initialValue: { title: "Dashboard" } }
  );
}

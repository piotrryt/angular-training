import {
  ApplicationConfig,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient } from "@angular/common/http";
export const API_URL = new InjectionToken<string>("api_url", {
  providedIn: "root",
  factory: () => "http://localhost:3000",
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
  ],
};

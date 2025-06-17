import {
  ApplicationConfig,
  inject,
  InjectionToken,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import {
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import { catchError, EMPTY, of } from "rxjs";

export const API_URL = new InjectionToken<string>("api_url", {
  providedIn: "root",
  factory: () => "https://rickandmortyapi.com/api",
});

const interceptor: HttpInterceptorFn = (req, next) => {
  // przed callem do api
  const clone = req.clone();

  req.headers.append("", "");

  if (req.url.includes("rickandmortyapi")) {
    // ...
  }

  return next(req)
    .pipe
    // catchError((err) => {
    //   // console.log(err);
    //   return of(err);
    // }),
    ();
};

const interceptor2: HttpInterceptorFn = (req, next) => {
  // przed callem do api
  const clone = req.clone();

  req.headers.append("", "");

  if (req.url.includes("rickandmortyapi")) {
    // ...
  }

  return next(req)
    .pipe
    // catchError((err) => {
    //   // console.log(err);
    //   return of(err);
    // }),
    ();
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([interceptor, interceptor2])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};

import { Injectable, signal } from "@angular/core";
import { of } from "rxjs";

export enum AuthStatus {
  AUTH = "AUTH",
  NON_AUTH = "NON_AUTH",
  NOT_VERIFIED = "NOT_VERIFIED",
}
export type AuthState = { type: AuthStatus };

@Injectable({
  providedIn: "root",
})
export class AuthService {
  #authState = signal({ type: AuthStatus.AUTH });

  authState = this.#authState.asReadonly();

  verify() {
    return of(Math.random() > 0.5);
  }
}

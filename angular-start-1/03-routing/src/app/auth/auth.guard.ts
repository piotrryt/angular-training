import { inject } from "@angular/core";
import { CanMatchFn, CanActivateFn, Router } from "@angular/router";
import { AuthService, AuthStatus } from "./auth.service";

export const authGuard: CanMatchFn = (route) => {
  const router = inject(Router);
  const service = inject(AuthService);

  //   return service.verify().pipe(map(response => {
  //     return response || router.createUrlTree(["/auth"])
  //   }));

  if (service.authState().type === AuthStatus.AUTH) {
    return true;
  }

  return router.createUrlTree(["/auth"]);
};

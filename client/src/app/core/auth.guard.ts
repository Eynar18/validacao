import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "./auth.service";

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('Route => ', route);
  console.log('State => ', state);

  if (authService.isLoggedIn()) {
    if (state.url.includes('sign-in')) {
      return router.createUrlTree(['/task']);
    }
    return true;
  }

  authService.logout();
  return router.createUrlTree(['/sign-in']);
};

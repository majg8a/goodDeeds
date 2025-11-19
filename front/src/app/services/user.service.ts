import { inject, Injectable } from '@angular/core';
import { Auth, authState, User } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  MaybeAsync,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService implements Resolve<User> {
  private auth = inject(Auth);
  user$ = authState(this.auth).pipe(
    filter((user) => user != null),
    map((user) => user!)
  );
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<User> {
    return this.user$;
  }
}

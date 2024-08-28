import { Injectable, inject } from '@angular/core';
import isNull from 'lodash-es/isNull';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';
import { tap } from 'rxjs/internal/operators/tap';
import { scheduled } from 'rxjs/internal/scheduled/scheduled';
import { asyncScheduler } from 'rxjs/internal/scheduler/async';
import { TokenService } from '../token/token.service';
import { CommonApiService } from '../../common-api/common-api.service';
import { CommonBaseAuthenticationService } from '../../common-api/base/common-base-authentication.service';
import { apiPath } from 'src/app/constant/api.path';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends CommonBaseAuthenticationService {
  private _tokenService: TokenService = inject(TokenService);

  private _commonApiService = inject(CommonApiService);

  get isLoggedIn$(): Observable<boolean> {
    return this._tokenService.token$.pipe(
      map((token) => !isNull(token.accessToken) && !isNull(token.refreshToken))
    );
  }

  login(req: { username: string; password: string }): Observable<unknown> {
    return this._commonApiService.post(apiPath.login, req);
  }

  logout(): Observable<unknown> {
    return scheduled<unknown>(of(undefined), asyncScheduler).pipe(
      tap((): void => {
        this._tokenService.cleanToken();
      })
    );
  }

  refreshToken(payload?: unknown): Observable<unknown> {
    console.log(payload);

    throw new Error('Method not implemented.');
  }

  sessionError(error: unknown): void {
    console.log(error);

    throw new Error('Method not implemented.');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { type Translation, type TranslocoLoader } from '@jsverse/transloco';
import { type Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class TranslocoLoaderService implements TranslocoLoader {
  COMMON_FILE_PATH_TOKEN = new InjectionToken<string>(
    'COMMON_FILE_PATH_TOKEN',
    {
      providedIn: 'root',
      factory: () => '/assets/i18n',
    }
  );

  private _http = inject(HttpClient);

  private _i18nFilePath = inject(this.COMMON_FILE_PATH_TOKEN);

  getTranslation<T extends Translation>(lang: string): Observable<T> {
    return this._http.get<T>(`${this._i18nFilePath}/${lang}.json`);
  }
}

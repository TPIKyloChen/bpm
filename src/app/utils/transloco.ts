import { provideHttpClient } from '@angular/common/http';

import { isDevMode, type EnvironmentProviders, type Type } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideTransloco,
  type TranslocoLoader,
  type TranslocoOptions,
} from '@jsverse/transloco';
import { PickObj } from '../service/api/authentication/token/token.service';
import { TranslocoLoaderService } from '../service/transloco-loader/transloco-loader.service';
/**
 * 公版 transloco provider
 * @param config - i18n套件設定
 * @param loader - 翻譯檔案載入器
 * @returns transloco 的 provider
 */
export function getTranslocoProvide(
  config?: PickObj<TranslocoOptions, 'config'>,
  loader: Type<TranslocoLoader> = TranslocoLoaderService
): (EnvironmentProviders | EnvironmentProviders[])[] {
  return [
    provideClientHydration(),
    provideHttpClient(),
    provideTransloco({
      config: {
        availableLangs: [
          {
            id: 'zh',
            label: '繁體中文',
          },
          {
            id: 'en',
            label: 'English',
          },
        ],
        defaultLang: 'zh',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
        ...config,
      },
      loader: loader,
    }),
  ];
}

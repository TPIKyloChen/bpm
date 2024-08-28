import { APP_INITIALIZER, type ApplicationConfig } from '@angular/core';
import { provideRouter, type Routes } from '@angular/router';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthenticationService } from './service/api/authentication/authentication/authentication.service';
import { TokenService } from './service/api/authentication/token/token.service';
import { COMMON_API_BASE_URL_TOKEN } from './service/api/common-api/token';

/** i18n */
import '@angular/localize/init';
import { CommonBaseAuthenticationService } from './service/api/common-api/base/common-base-authentication.service';
import { CommonBaseTokenService } from './service/api/common-api/base/common-base-token.service';
import { loaderInterceptor } from './interceptors/common-loader.interceptor';
import { getTranslocoProvide } from './utils/transloco';
import { DecisionTablesComponent } from './pages/main/decision-tables/decision-tables.component';
import { MainAppsComponent } from './pages/main/main-apps/main-apps.component';
import { MainFormsComponent } from './pages/main/main-forms/main-forms.component';
import { ProcessesComponent } from './pages/main/processes/processes.component';
import { BpmnFormComponent } from './components/bpmn-form/bpmn-form.component';

const supportLangs = [
    {
      id: 'zh',
      label: '繁體中文',
    },
    {
      id: 'en',
      label: 'English',
    },
  ],
  routes: Routes = [
    {
      path: 'login',
      loadComponent: () =>
        import('./pages/login/index.component').then((c) => c.IndexComponent),
    },
    {
      path: 'main',
      loadComponent: () =>
        import('./pages/main/main.component').then((c) => c.MainComponent),
      children: [
        {
          path: 'processes',
          component: ProcessesComponent,
        },
        {
          path: 'main-forms',
          component: MainFormsComponent,
        },
        {
          path: 'decisionTables',
          component: DecisionTablesComponent,
        },
        {
          path: 'main-apps',
          component: MainAppsComponent,
        },
      ],
    },
    {
      path: 'dashboard',
      loadComponent: () =>
        import('./pages/dashboard/dashboard.component').then(
          (c) => c.DashboardComponent
        ),
    },
    {
      path: 'bpmn-form',
      component: BpmnFormComponent,
    },
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/login',
    },
    {
      path: '**',
      redirectTo: '/login',
    },
  ];

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideRouter(routes),
    ...getTranslocoProvide({
      availableLangs: supportLangs,
      defaultLang:
        localStorage.getItem('lang') ??
        (() => {
          const defaultLang = 'zh';

          localStorage.setItem('lang', defaultLang);

          return defaultLang;
        })(),
    }),
    provideAnimationsAsync(),
    {
      provide: COMMON_API_BASE_URL_TOKEN,
      useValue: '/v1/oauth',
    },
    TokenService,
    {
      provide: CommonBaseTokenService,
      useExisting: TokenService,
    },
    {
      provide: CommonBaseAuthenticationService,
      useExisting: AuthenticationService,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (tokenService: TokenService) => () => {
        tokenService.initToken();
      },
      deps: [TokenService],
      multi: true,
    },
  ],
};

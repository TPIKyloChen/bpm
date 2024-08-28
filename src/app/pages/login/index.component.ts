import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
import { AuthenticationService } from 'src/app/service/api/authentication/authentication/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  private _router = inject(Router);

  private _authService = inject(AuthenticationService);

  constructor() {}

  submit(): any {
    const login = this._authService
      .login({ username: 'user', password: '123' })
      .subscribe(async () => {
        await this._router.navigate(['main']);
        login.unsubscribe();
      });
  }
}

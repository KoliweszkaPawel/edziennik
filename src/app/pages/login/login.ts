import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {AuthorizationService} from '../../core/auth/services/authorization.service';

@Component({
  selector: 'app-login',
  imports: [
    MatButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authorization = inject(AuthorizationService);

  async loginWithGoogle(): Promise<void> {
    await this.authorization.loginGoogle();
  }
}

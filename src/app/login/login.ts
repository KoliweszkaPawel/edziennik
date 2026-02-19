import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {Authorization} from '../authorization';

@Component({
  selector: 'app-login',
  imports: [
    MatButton
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private authorization = inject(Authorization);

  async loginWithGoogle(): Promise<void> {
    await this.authorization.loginGoogle();
  }
}

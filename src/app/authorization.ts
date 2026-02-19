import {inject, Injectable} from '@angular/core';
import {Auth, authState, GoogleAuthProvider, signInWithPopup, signOut} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private router = inject(Router);
  private auth = inject(Auth);
  currentUser = toSignal(authState(this.auth));

  async loginGoogle(): Promise<void> {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider())
      console.log('Zalogowano pomyślnie!', result.user);
      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log('Błąd logowania!', error);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }
}

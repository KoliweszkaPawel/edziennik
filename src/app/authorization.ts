import {inject, Injectable} from '@angular/core';
import {Auth, authState, GoogleAuthProvider, signInWithPopup, signOut} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';
import {Router} from '@angular/router';
import {doc, docData, Firestore, getDoc, setDoc} from '@angular/fire/firestore';
import {UserProfile} from './user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Authorization {
  private router = inject(Router);
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  currentUser = toSignal(authState(this.auth));

  async loginGoogle(): Promise<void> {
    try {
      const result = await signInWithPopup(this.auth, new GoogleAuthProvider())
      console.log('Zalogowano pomyślnie!', result.user);

      const userRef = doc(this.firestore, `users/${result.user.uid}`);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          uid: result.user.uid,
          email: result.user.email,
          role: 'student'
        });
      }

      await this.router.navigate(['/dashboard']);
    } catch (error) {
      console.log('Błąd logowania!', error);
    }
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
    await this.router.navigate(['/']);
  }

  getUserProfile(uid: string): Observable<UserProfile> {
    const userRef = doc(this.firestore, `users/${uid}`);
    return docData(userRef) as Observable<UserProfile>;
  }
}

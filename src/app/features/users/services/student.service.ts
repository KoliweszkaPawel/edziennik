import {inject, Injectable} from '@angular/core';
import {collection, collectionData, Firestore, query, where} from '@angular/fire/firestore';
import {UserProfile} from '../models/user.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private firestore = inject(Firestore);

  getStudents(): Observable<UserProfile[]> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('role', '==', 'student'));
    return collectionData(q, {idField: 'uid'}) as Observable<UserProfile[]>;
  }
}

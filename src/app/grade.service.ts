import {inject, Injectable} from '@angular/core';
import {addDoc, collection, collectionData, Firestore, query, where, DocumentReference} from '@angular/fire/firestore';
import {Grade, GradeDTO} from './grade.model';
import {from, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  private firestore = inject(Firestore);

  addGrade(gradeData: Grade): Observable<DocumentReference> {
    const gradesCollection = collection(this.firestore, 'grades');
    return from(addDoc(gradesCollection, gradeData));
  }

  getGrades(studentId: string): Observable<Grade[]> {
    const gradesCollection = collection(this.firestore, 'grades');
    const q = query(gradesCollection, where('studentId', '==', studentId));
    return (collectionData(q, { idField: 'id'}) as Observable<GradeDTO[]>).pipe(map(grades => grades.map(grade => ({
      ...grade,
      createdAt: grade.createdAt.toDate()
    })))) as Observable<Grade[]>;
  }
}

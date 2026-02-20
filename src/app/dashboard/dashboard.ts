import {Component, inject} from '@angular/core';
import {Authorization} from '../authorization';
import {GradeService} from '../grade.service';
import {Grade} from '../grade.model';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {toSignal} from '@angular/core/rxjs-interop';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButton,
    MatTableModule,
    DatePipe
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authorization = inject(Authorization);
  private gradeService = inject(GradeService);
  private uid = this.authorization.currentUser()!.uid;
  protected grades = toSignal(this.gradeService.getGrades(this.uid), { initialValue: []});
  displayedColumns = ['subject', 'value', 'weight', 'createdAt', 'teacher'];

  async addTestGrade() {
    const uid = this.authorization.currentUser()?.uid;

    if (!uid) return;

    const newGrade: Grade = {
      studentId: uid,
      subject: 'Matematyka',
      value: 5,
      weight: 3,
      description: 'Sprawdzian',
      createdAt: new Date(),
      teacher: 'Jan Kowalski'
    }

    await this.gradeService.addGrade(newGrade);
  }
}

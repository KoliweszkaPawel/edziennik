import {Component, inject} from '@angular/core';
import {Authorization} from '../authorization';
import {GradeService} from '../grade.service';
import {Grade} from '../grade.model';
import {MatButton} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {toSignal} from '@angular/core/rxjs-interop';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StudentService} from '../student.service';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatButton,
    MatTableModule,
    DatePipe,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatSelect,
    MatOption
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authorization = inject(Authorization);
  private gradeService = inject(GradeService);
  private studentService = inject(StudentService);
  private uid = this.authorization.currentUser()!.uid;
  protected userProfile = toSignal(this.authorization.getUserProfile(this.uid));
  protected grades = toSignal(this.gradeService.getGrades(this.uid), { initialValue: []});
  protected students = toSignal(this.studentService.getStudents(), { initialValue: []});
  displayedColumns = ['subject', 'value', 'weight', 'createdAt', 'teacher'];

  newGradeForm = new FormGroup({
    studentId: new FormControl('', Validators.required),
    subject: new FormControl('', Validators.required),
    value: new FormControl<number | null>(null, Validators.required),
    weight: new FormControl<number | null>(null, Validators.required),
    description: new FormControl('', Validators.required),
  });

  async onSubmit() {
    if(this.newGradeForm.valid) {
      const formValue = this.newGradeForm.value;
      const newGrade: Grade = {
        studentId: formValue.studentId!,
        subject: formValue.subject!,
        value: formValue.value!,
        weight: formValue.weight!,
        description: formValue.description!,
        createdAt: new Date,
        teacher: this.userProfile()?.email!
      }
      await this.gradeService.addGrade(newGrade);
      this.newGradeForm.reset();
    }
  }
}

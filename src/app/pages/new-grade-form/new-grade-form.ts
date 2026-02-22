import {Component, inject, input} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators} from '@angular/forms';
import {Grade} from '../../features/grades/models/grade.model';
import {StudentService} from '../../features/users/services/student.service';
import {toSignal} from '@angular/core/rxjs-interop';
import {GradeService} from '../../features/grades/services/grade.service';

@Component({
  selector: 'app-new-grade-form',
  imports: [
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    ReactiveFormsModule
  ],
  templateUrl: './new-grade-form.html',
  styleUrl: './new-grade-form.scss',
})
export class NewGradeForm {
  email = input.required<string>();

  private gradeService = inject(GradeService);
  private studentService = inject(StudentService);
  protected students = toSignal(this.studentService.getStudents(), { initialValue: []});

  newGradeForm = new FormGroup({
    studentId: new FormControl('', {nonNullable: true, validators: Validators.required}),
    subject: new FormControl('', {nonNullable: true, validators: Validators.required}),
    value: new FormControl<number>(0, {nonNullable: true, validators: Validators.required}),
    weight: new FormControl<number>(0, {nonNullable: true, validators: Validators.required}),
    description: new FormControl('', {nonNullable: true, validators: Validators.required}),
  });

  onSubmit(formDir: FormGroupDirective) {
    if(this.newGradeForm.valid) {
      const formValue = this.newGradeForm.getRawValue();
      const newGrade: Grade = {
        studentId: formValue.studentId,
        subject: formValue.subject,
        value: formValue.value,
        weight: formValue.weight,
        description: formValue.description,
        createdAt: new Date,
        teacher: this.email()
      }
      this.gradeService.addGrade(newGrade).subscribe({
        next: () => {
          formDir.resetForm();
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania oceny', err);
        }
      });
    }
  }
}

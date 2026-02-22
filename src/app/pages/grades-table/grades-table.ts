import {Component, inject, input} from '@angular/core';
import {DatePipe} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableModule,
} from '@angular/material/table';
import {GradeService} from '../../features/grades/services/grade.service';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-grades-table',
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatTableModule
  ],
  templateUrl: './grades-table.html',
  styleUrl: './grades-table.scss',
})
export class GradesTable {

  uid = input.required<string>();
  private gradeService = inject(GradeService);
  private uid$ = toObservable(this.uid);
  protected grades = toSignal(
    this.uid$.pipe(switchMap(id => this.gradeService.getGrades(id))),
    { initialValue: []}
  );

  displayedColumns = ['subject', 'value', 'weight', 'createdAt', 'teacher'];
}

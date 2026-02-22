import {Component, inject} from '@angular/core';
import {AuthorizationService} from '../../core/auth/services/authorization.service';
import {MatTableModule} from '@angular/material/table';
import {toSignal} from '@angular/core/rxjs-interop';
import {ReactiveFormsModule} from '@angular/forms';
import {GradesTable} from '../grades-table/grades-table';
import {NewGradeForm} from '../new-grade-form/new-grade-form';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatTableModule,
    ReactiveFormsModule,
    GradesTable,
    NewGradeForm
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private authorization = inject(AuthorizationService);
  protected uid = this.authorization.currentUser()!.uid;
  protected userProfile = toSignal(this.authorization.getUserProfile(this.uid));
}

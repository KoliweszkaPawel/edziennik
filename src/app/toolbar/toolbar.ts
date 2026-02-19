import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {Authorization} from '../authorization';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatToolbar,
    MatButton,
    RouterLink,
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {
  protected authorization = inject(Authorization);

  async logout(): Promise<void> {
    await this.authorization.logout();
  }
}

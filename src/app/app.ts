import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { StudentCycleBug } from './student/provided/student-cycle-bug';
@Component({
  imports: [RouterOutlet, StudentCycleBug],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}

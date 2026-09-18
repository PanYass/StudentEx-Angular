import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloStudent } from './student/hello-student/hello-student';
import { StudentCard } from './student/student-card/student-card';
import { StudentList } from './student/student-list/student-list';

@Component({
  imports: [RouterOutlet, StudentList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HelloStudent } from './student/hello-student/hello-student';
import { StudentCard } from './student/student-card/student-card';
import { StudentList } from './student/student-list/student-list';
import { StudentForm } from './student/student-form/student-form';
@Component({
  imports: [RouterOutlet, StudentList, StudentForm],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('my-app');
}

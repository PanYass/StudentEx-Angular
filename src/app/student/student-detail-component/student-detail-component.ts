import { Component, inject } from '@angular/core';
import { StudentListService } from '../student-list-service';

@Component({
  imports: [],
  selector: 'app-student-detail-component',
  styleUrl: './student-detail-component.css',
  templateUrl: './student-detail-component.html',
})
export class StudentDetailComponent {

  readonly service= inject(StudentListService)
  
}

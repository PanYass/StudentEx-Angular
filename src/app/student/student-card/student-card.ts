import { CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { Student } from '../student';
import { CounterComponent } from '../counter-component/counter-component';

@Component({
  imports: [UpperCasePipe, CounterComponent],
  selector: 'app-student-card',
  styleUrl: './student-card.css',
  templateUrl: './student-card.html',
})
export class StudentCard {
  readonly student = input.required<Student>();

  readonly remove = output<number>();

  onChange(event: Event): void {
  const option = (event.target as HTMLSelectElement).value




}



  readonly currentYear  = new Date().getFullYear();





}


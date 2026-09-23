import { Component, signal } from '@angular/core';
import { Student } from '../student';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { StudentCard } from "../student-card/student-card";

@Component({
  imports: [StudentCard],
  selector: 'app-student-list',
  styleUrl: './student-list.css',
  templateUrl: './student-list.html',
})
export class StudentList {
removeStudent(id:number) :void{
  this.TabStudent.update(items=>items.filter(student=>student.id!=id))

}

  a: Student = {
    id: 0,
    firstName: 'A',
    name: 'a',
    program: 'Aa',
    graduationYear: 0
  }
    b: Student = {
    id: 1,
    firstName: 'B',
    name: 'b',
    program: 'BB',
    graduationYear: 0
  }
    c: Student = {
    id: 2,
    firstName: '',
    name: '',
    program: '',
    graduationYear: 3
  }
  TabStudent = signal<Student[]>([this.a, this.b, this.c]);


  addStudent():void {
    const student: Student = {
      id: this.TabStudent().length,
      firstName: 'default ',
      name: ' name ',
      program: '',
      graduationYear: 0,
    };

    this.TabStudent.update(students => [...students, student]);


  }

}

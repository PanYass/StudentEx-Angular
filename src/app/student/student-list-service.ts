import { computed, Injectable, signal } from '@angular/core';
import { Student } from "./student";


@Injectable({ providedIn: 'root' })
export class StudentListService {
removeStudent(id:number) :boolean{

    const exists = this._students().some(s=> s.id==id)
    if(!exists)  return false
    this._students.update(items => items.filter(student => student.id !== id))
    return true
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
  private readonly _students = signal<Student[]>([this.a, this.b, this.c]);
  readonly students = this._students.asReadonly()
  //there is a difference between these, the first we prohibit it from changing what it points to , reference
  //the 2nd we prohibit we from using even set and update, changing la valeur, type valeur
  readonly studentCount = computed(()=>this._students().length)

  add(draft: Omit<Student, 'id'>): Student {
    const student: Student = { id: this.nextId(), ...draft };
    this._students.update(students => [...students, student]);
    return student;
  }

  update(student: Student): boolean {
    let updated = false;
    this._students.update(students => students.map(current => {
      if (current.id !== student.id) return current;
      updated = true;
      return student;
    }));
    return updated;
  }


  addStudent():void {
    this.add({
      firstName: 'default ',
      name: ' name ',
      program: '',
      graduationYear: 0,
    });


  }

  private nextId(): number {
    return this._students().reduce((maxId, student) => Math.max(maxId, student.id), -1) + 1;
  }


  findByid(id:number): Student | undefined {
    return this._students().find(s=> s.id==id)


  }

}

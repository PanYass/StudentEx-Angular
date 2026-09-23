import { computed, Service, signal } from "@angular/core";
import { Student } from "./student";


@Service()
export class StudentListService {
removeStudent(id:number) :boolean{

    const exists = this._students().some(s=> s.id==id)
    if(!exists)  return false
    this._students.update((items: any[])=>items.filter(student=>student.id!=id))
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


  addStudent():void {
    const student: Student = {
      id: this._students().length,

      firstName: 'default ',
      name: ' name ',
      program: '',
      graduationYear: 0,
    };

    this._students.update(students => [...students, student]);


  }


  findByid(id:number): Student | undefined {
    return this._students().find(s=> s.id==id)


  }

}

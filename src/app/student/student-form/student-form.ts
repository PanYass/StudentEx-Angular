import { Component, signal } from '@angular/core';
import { Student } from '../student';
import { form, FormField, required } from '@angular/forms/signals';

type StudentDraft = Omit<Student, 'id'>;
type StudentFormModel = Omit<StudentDraft, 'graduationYear'> & {graduationYear: number|null};
type StudentUpdate = Partial<Student> & {id:number};



@Component({
  imports: [FormField],
  selector: 'app-student-form',
  styleUrl: './student-form.css',
  templateUrl: './student-form.html',
})
export class StudentForm {

  readonly model = signal<StudentFormModel> ({
    firstName: '',
    name: '',
    program: '',
    graduationYear: null,
    


  })

  readonly editorForm = form(this.model, path => {

    required(path.firstName, {
      message: 'Prenom obligatoire'
    })
  });


}

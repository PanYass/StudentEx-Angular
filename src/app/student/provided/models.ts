import { Student } from '../student';

export type StudentDraft = Omit<Student, 'id'>;
export type StudentFormModel = Omit<StudentDraft, 'graduationYear'> & { graduationYear: number | null };
export type StudentUpdate = Partial<Student> & { id: number };

export function emptyStudentForm(): StudentFormModel {
    return {
        firstName: '',
        name: '',
        program: '',
        graduationYear: null,
    };
}

export function studentToForm(student: Student): StudentFormModel {
    return {
    firstName: student.firstName, name: student.name,
    program: student.program, graduationYear: student.graduationYear,
    };
}

export function toStudentDraft(model: StudentFormModel): StudentDraft {
    return {
        firstName: model.firstName.trim(),
        name: model.name.trim(),
        program: model.program.trim(),
        graduationYear: model.graduationYear as number,
    };
}
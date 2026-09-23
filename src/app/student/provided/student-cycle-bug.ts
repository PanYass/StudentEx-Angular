import { Component, inject, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { form, FormField, required, validate, submit } from '@angular/forms/signals';
import { Student} from '../student'
import { StudentFormModel, studentToForm, emptyStudentForm, toStudentDraft } from './models';
import { StudentListService } from '../student-list-service';
import { nonBlankError, integerError } from './rules';

@Component({
  selector: 'app-student-cycle-bug', imports: [FormField, JsonPipe],
  templateUrl: './student-editor.html',
})
export class StudentCycleBug {
  readonly service = inject(StudentListService);
  readonly selectedId = signal<number | null>(null);
  readonly editorVisible = signal(false);
  readonly statusMessage = signal('');
  readonly model = signal<StudentFormModel>(emptyStudentForm());
  readonly editorForm = form(this.model, path => {
    required(path.firstName, { message: 'Prénom : valeur obligatoire.' });
    validate(path.firstName, ({ value }) => nonBlankError(value()));
    required(path.name, { message: 'Nom : valeur obligatoire.' });
    validate(path.name, ({ value }) => nonBlankError(value()));
    required(path.program, { message: 'Formation : valeur obligatoire.' });
    validate(path.program, ({ value }) => nonBlankError(value()));
    required(path.graduationYear, { message: 'Année de diplôme : valeur obligatoire.' });
    validate(path.graduationYear, ({ value }) => integerError(value()));
  });

  startEdit(item: Student): void {
    if (this.editorForm().submitting()) return;
    this.selectedId.set(item.id);
    this.editorVisible.set(true);
    this.model.set(studentToForm(item)); // EXERCICE C : valeurs seules, états périmés.
    this.statusMessage.set('Modification ouverte.');
    this.editorForm.firstName().focusBoundControl();
  }
  startCreate(): void {
    if (this.editorForm().submitting()) return;
    this.selectedId.set(null);
    this.editorVisible.set(true);
    this.editorForm().reset(emptyStudentForm());
    this.statusMessage.set('');
    this.editorForm.firstName().focusBoundControl();
  }
  cancel(): void {
    if (this.editorForm().submitting()) return;
    this.selectedId.set(null);
    this.editorVisible.set(false);
    this.editorForm().reset(emptyStudentForm());
    this.statusMessage.set('Saisie annulée. Le catalogue est inchangé.');
  }
  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    if (this.editorForm().submitting()) return;
    this.statusMessage.set('');
    const id = this.selectedId();
    const success = await submit(this.editorForm, {
      action: async field => {
        const draft = toStudentDraft(field().value());
        if (id === null) {
          this.service.add(draft);
        } else if (!this.service.update({ id, ...draft })) {
          this.statusMessage.set('La cible a été supprimée. Aucune modification enregistrée.');
          return { kind: 'missing', message: 'Cette donnée n’existe plus dans le catalogue.' };
        }
        return undefined;
      },
      onInvalid: field => {
        this.statusMessage.set('Corrigez les champs indiqués.');
        field().errorSummary()[0]?.fieldTree().focusBoundControl();
      },
    });
    if (success) {
      this.selectedId.set(null);
      this.editorVisible.set(false);
      this.editorForm().reset(emptyStudentForm());
      this.statusMessage.set(id === null ? 'Création enregistrée.' : 'Modification enregistrée.');
    }
  }
}

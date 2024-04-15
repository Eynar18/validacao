import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {futureOrPresentDateValidator} from "../../shared/form-validations/future-or-present-date.validator";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  form: FormGroup;
  actionBtn: string = "Add";

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      description: new FormControl(data ? data.description : '', Validators.required),
      priority: new FormControl(data ? data.priority : null, Validators.required),
      deadline: new FormControl(data ? data.deadline : new Date(), [Validators.required, futureOrPresentDateValidator])
    });

    if (data) {
      this.actionBtn = "Edit";
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

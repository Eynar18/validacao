import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {futureOrPresentDateValidator} from "../../shared/form-validations/future-or-present-date.validator";
import {TaskPriorityEnum} from "../../pages/task/model/task-priority.enum";
import {PriorityLabels} from "../../pages/task/model/priority-labels";

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent implements OnInit {
  form!: FormGroup;
  actionBtn: string = "Add";
  priorityOptions = Object.values(TaskPriorityEnum);
  priorityLabels = PriorityLabels;

  constructor(
    private dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {}

  ngOnInit(): void {
    let date = new Date()
    if (this.data) {
      let date = new Date(this.data.deadline)
      date.setHours(3);
    }
    this.form = new FormGroup({
      description: new FormControl(this.data ? this.data.description : '', Validators.required),
      priority: new FormControl(this.data ? this.data.priority : null, Validators.required),
      deadline: new FormControl(this.data ? date : new Date(), [Validators.required, futureOrPresentDateValidator()])
    });

    if (this.data) {
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

  getPriorityLabel(priority: TaskPriorityEnum | string): string {
    return this.priorityLabels[priority];
  }
}

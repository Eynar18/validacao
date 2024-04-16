import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../../components/task-form/task-form.component";
import {Task} from "./model/task";
import {ApiGenericResponse} from "../../core/model/api-generic-response";
import {ToastrService} from "ngx-toastr";
import {TaskService} from "./task.service";
import {ConfirmDialogComponent} from "../../components/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['description', 'priority', 'deadline', 'actions'];
  tasks: Task[] = [];

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private taskSerice: TaskService
  ) {}

  ngOnInit(): void {
    this.fillGrid()
  }

  fillGrid() {
    this.taskSerice.list().subscribe((result: Task[]) => {
      this.tasks = result;
    })
  }

  openAddTaskDialog(): void {
    this.dialog.open(TaskFormComponent, {
      width: '500px',
    }).afterClosed()
      .subscribe((task: Task) => {
      if (task) {
        this.taskSerice.save(task)
          .subscribe((response: ApiGenericResponse) => {
            if (response) {
              this.toastr.success(response.message, 'Created');
              this.fillGrid();
            }
        })
      }
    });
  }

  openEditTaskDialog(data: Task) {
    this.dialog.open(TaskFormComponent, {
      data,
      width: '500px',
    }).afterClosed().subscribe((task: Task) => {
      if (task) {
        task.id = data.id;
        this.taskSerice.save(task).subscribe((response: ApiGenericResponse) => {
          if (response) {
            this.toastr.success(response.message, 'Edited');
            this.fillGrid();
          }
        })
      }
    });
  }

  onDelete(taskId: string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      height: '150px',
      data: { message: 'Are you sure you want to delete this task?' }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.taskSerice.delete(taskId).subscribe((response: ApiGenericResponse) => {
          if (response) {
            this.toastr.success(response.message, 'Deleted');
            this.fillGrid();
          }
        })
      }
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {TaskFormComponent} from "../../components/task-form/task-form.component";
import {Task} from "./model/task";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit {
  displayedColumns: string[] = ['description', 'priority', 'deadline'];
  tasks: Task[] = [];

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openAddTaskDialog(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}

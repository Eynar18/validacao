import {TaskPriorityEnum} from "./task-priority.enum";

export interface Task {
  id?: string;
  description: string;
  priority: TaskPriorityEnum;
  deadline: Date;
}

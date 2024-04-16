import {TaskPriorityEnum} from "./task-priority.enum";

export const PriorityLabels: Record<string, string> = {
  [TaskPriorityEnum.URGENT.toString()]: 'Urgent',
  [TaskPriorityEnum.HIGH.toString()]: 'High',
  [TaskPriorityEnum.MEDIUM.toString()]: 'Medium',
  [TaskPriorityEnum.LOW.toString()]: 'Low'
};

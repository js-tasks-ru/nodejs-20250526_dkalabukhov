import { Task } from "../tasks/task.model";
import { TaskStatus } from "../tasks/task.model";

export function orderByStatus(tasks: Task[]) {
  const statusOrder = {
    [TaskStatus.PENDING]: 1,
    [TaskStatus.IN_PROGRESS]: 2,
    [TaskStatus.COMPLETED]: 3,
  };

  return tasks.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
}

export function orderByTitle(tasks: Task[]) {
  return tasks.sort((a, b) => a.title.localeCompare(b.title));
}
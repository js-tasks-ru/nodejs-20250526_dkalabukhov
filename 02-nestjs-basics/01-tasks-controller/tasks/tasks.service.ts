import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.model";
import { TaskDto } from "./dto/task.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    return task;
  }

  public createTask(task: TaskDto): Task {
    const id = `task-${this.tasks.length + 1}`;
    const newTask = { id, ...task};
    this.tasks.push(newTask);

    return newTask;
  }

  public updateTask(id: string, update: Partial<TaskDto>): Task {
    const task = this.getTaskById(id);

    Object.assign(task, update);

    return task;
  }

  public deleteTask(id: string): Task {
    const task = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return task;
  }
}

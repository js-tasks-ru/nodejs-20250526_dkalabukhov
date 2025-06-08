import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto, Task, TaskStatus, TaskSubject, UpdateTaskDto } from "./task.model";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly usersService: UsersService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    await this.notificationsService.sendEmail(
      this.usersService.getUserById(assignedTo).email,
      TaskSubject.TaskCreate,
      `Вы назначены ответственным за задачу: "${title}"`,
    );

    const task: Task = {
      id: (this.tasks.length + 1).toString(),
      title,
      description,
      status: TaskStatus.Pending,
      assignedTo,
    };
    this.tasks.push(task);

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find((t) => t.id === id);

    const { status } = updateTaskDto;

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    await this.notificationsService.sendSMS(
      this.usersService.getUserById(task.assignedTo).phone,
      `Статус задачи "${task.title}" обновлён на "${status}"`,
    );

    Object.assign(task, updateTaskDto);
    return task;
  }
}

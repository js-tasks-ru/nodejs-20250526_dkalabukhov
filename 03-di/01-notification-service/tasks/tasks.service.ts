import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
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

  private throwIfIncorrectUser(id: number) {
    const user = this.usersService.getUserById(id);
    if (!user.email || user.email.trim() === '') {
      throw new BadRequestException('Email is required');
    }

    if (!user.phone || user.phone.trim() === '') {
      throw new BadRequestException('Phone is required');
    }
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const { title, description, assignedTo } = createTaskDto;

    this.throwIfIncorrectUser(assignedTo);

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

    this.throwIfIncorrectUser(task.assignedTo);

    await this.notificationsService.sendSMS(
      this.usersService.getUserById(task.assignedTo).phone,
      `Статус задачи "${task.title}" обновлён на "${status}"`,
    );

    Object.assign(task, updateTaskDto);
    return task;
  }
}

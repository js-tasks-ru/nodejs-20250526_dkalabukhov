import { Task, TaskStatus } from '../task.model';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class TaskDto implements Task {
  @IsString({ message: 'Название таска должно быть строкой' })
  @IsNotEmpty({ message: 'Название таска не может быть пустым' })
  public title: string;

  @IsString({ message: 'Описание таска должно быть строкой' })
  @IsNotEmpty({ message: 'Описание таска не может быть пустым' })
  public description: string;

  @IsEnum(TaskStatus, { message: 'Недопустимое значение статуса таска' })
  public status: TaskStatus;
}
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderOptions, TaskStatus } from '../task.model';

export class GetTasksQueryDto {
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Недопустимое значение статуса' })
  public status: TaskStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Номер страницы должен быть целым числом' })
  @Min(1, { message: 'Номер страницы не может быть меньше 1' })
  public page: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'Количество элементов на странице должно быть целым числом' })
  @Min(1, { message: 'Количество элементов на странице не может быть меньше 1' })
  public limit: number;

  @IsOptional()
  @IsEnum(OrderOptions, { message: 'Недопустимое значение сортировки' })
  public orderBy: OrderOptions;
}
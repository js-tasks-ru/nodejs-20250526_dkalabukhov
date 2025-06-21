import { PartialType } from "@nestjs/mapped-types";
import { CreateTaskDto } from "./create-task.dto";
import { IsBoolean, IsDate, IsDateString, IsEnum, IsOptional } from "class-validator";
import { TaskPriority } from "../enums/priority.enum";
import { Type } from "class-transformer";

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsBoolean({ message: 'Статус задачи должен быть boolean' })
  @IsOptional()
  isCompleted: boolean;

  @IsDate({ message: 'Дедлайн задачи должен быть датой' })
  @Type(() => Date)
  @IsOptional()
  deadline: Date;

  @IsEnum(TaskPriority, { message: 'Приоритет задачи должен быть Low, Medium или High' })
  @IsOptional()
  priority: TaskPriority;
}

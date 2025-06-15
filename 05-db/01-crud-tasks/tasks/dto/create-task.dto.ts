import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty( { message: 'Название задачи не может быть пустым' })
  @IsString({ message: 'Название задачи должно быть строкой' })
  title: string;

  @IsNotEmpty({ message: 'Описание задачи не может быть пустым' })
  @IsString({ message: 'Описание задачи должно быть строкой' })
  description: string;

  @IsOptional()
  @IsBoolean({ message: 'Статус задачи должен быть boolean' })
  isCompleted: boolean;
}

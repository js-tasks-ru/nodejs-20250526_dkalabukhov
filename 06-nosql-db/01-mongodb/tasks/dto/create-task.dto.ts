import { IsNotEmpty, IsString, Min } from "class-validator";

export class CreateTaskDto {
  @Min(2, { message: 'Название задачи не может быть короче 2 символов' })
  @IsString({ message: 'Название задачи должно быть строкой' })
  title: string;

  @IsNotEmpty({ message: 'Описание задачи не может быть пустым' })
  @IsString({ message: 'Описание задачи должно быть строкой' })
  description: string;
}

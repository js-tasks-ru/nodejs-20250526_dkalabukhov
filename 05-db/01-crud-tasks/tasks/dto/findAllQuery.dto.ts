import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from 'class-transformer';
export class FindAllQueryDto {
  @IsOptional()
  @Min(1, { message: 'Номер страницы не может быть меньше 1' })
  @IsInt({ message: 'Номер страницы должен быть целым числом' })
  @Type(() => Number)
  page: number

  @IsOptional()
  @Min(1, { message: 'Количество элементов не может быть меньше 1' })
  @IsInt({ message: 'Количество элементов должно быть целым числом' })
  @Type(() => Number)
  limit: number
}

import { BadRequestException, PipeTransform } from "@nestjs/common";

export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const parsedValue = parseInt(value, 10);

    if (Number.isNaN(parsedValue)) {
      throw new BadRequestException(`"${value}" не является числом`)
    }

    return parsedValue;
  }
}

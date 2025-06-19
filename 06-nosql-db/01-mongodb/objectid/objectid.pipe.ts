import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isValidObjectId, Types } from "mongoose";

@Injectable()
export class ObjectIDPipe implements PipeTransform {
  transform(value: string | Types.ObjectId): Types.ObjectId {
    if (value instanceof Types.ObjectId) {
      return value;
    }

    if (typeof value === 'string' && isValidObjectId(value)) {
      return new Types.ObjectId(value);
    }

    throw new BadRequestException('not a valid object id');
  }
}

import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import mongoose from "mongoose";

@Catch(mongoose.Error.ValidationError, mongoose.mongo.MongoError)
export class MongoFilter implements ExceptionFilter {
  catch (
    exception: mongoose.Error.ValidationError | mongoose.mongo.MongoError,
    host: ArgumentsHost
  ) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();

    const responseToUser = {
      statusCode: 400,
      error: 'Bad Request',
      message: exception.message,
    }

    response
      .status(400)
      .json(responseToUser);
  }
}

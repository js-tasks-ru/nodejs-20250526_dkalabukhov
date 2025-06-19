import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { TaskPriority } from "../enums/priority.enum";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ unique: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop()
  deadline: Date;

  @Prop({
    type: String,
    enum: TaskPriority
  })
  priority: TaskPriority;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

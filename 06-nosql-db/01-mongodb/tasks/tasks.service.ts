import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Task } from "./schemas/task.schema";
import { Model, ObjectId } from "mongoose";

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private TaskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto) {
    return await this.TaskModel.create(createTaskDto);
  }

  async findAll() {
    return await this.TaskModel.find();
  }

  async findOne(id: ObjectId) {
    const task = await this.TaskModel.findById(id);

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return task;
  }

  async update(id: ObjectId, updateTaskDto: UpdateTaskDto) {
    const { ...rest } = updateTaskDto;
    const updatedTask = await this.TaskModel.findByIdAndUpdate(id, rest, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return updatedTask;
  }

  async remove(id: ObjectId) {
    const task = await this.TaskModel.exists({_id: id});

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return await this.TaskModel.findByIdAndDelete(id);
  }
}

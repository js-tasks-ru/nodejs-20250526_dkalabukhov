import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./entities/task.entity";
import { FindAllQueryDto } from "./dto/findAllQuery.dto";

@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    return await this.taskRepository.save(task);
  }

  async findAll(queryParams: FindAllQueryDto) {
    if (queryParams.page && queryParams.limit) {
      return await this.taskRepository.find({
        skip: (queryParams.page - 1) * queryParams.limit,
        take: queryParams.limit,
      });
    }

    return await this.taskRepository.find();
  }

  async findOne(id: number) {
    if (Number.isNaN(id)) {
      throw new BadRequestException(`Параметр запроса не является числом`);
    }

    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена`);
    }

    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.findOne(id);

    await this.taskRepository.update(id, updateTaskDto);
    const updatedTask = await this.findOne(id);
    return updatedTask;
  }

  async remove(id: number) {
    const task = await this.findOne(id);
    await this.taskRepository.delete(task);
    return { message: 'Task deleted successfully' };
  }
}

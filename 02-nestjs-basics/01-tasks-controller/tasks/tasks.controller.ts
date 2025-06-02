import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TaskDto } from "./dto/task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(":id")
  getTaskById(@Param("id") id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() dto: TaskDto) {
    return this.tasksService.createTask(dto);
  }

  @Patch(":id")
  updateTask(@Param("id") id: string, @Body() dto: Partial<TaskDto>) {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(":id")
  deleteTask(@Param("id") id: string) {
    return this.tasksService.deleteTask(id);
  }
}

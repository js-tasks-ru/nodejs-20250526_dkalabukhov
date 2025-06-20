import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { FindAllQueryDto } from "./dto/findAllQuery.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll(@Query() queryParams: FindAllQueryDto) {
    return this.tasksService.findAll(queryParams);
  }

  @Get(":id")
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(Number(id));
  }

  @Patch(":id")
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(Number(id), updateTaskDto);
  }

  @Delete(":id")
  remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}

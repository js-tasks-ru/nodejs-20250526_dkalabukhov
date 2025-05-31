import { Controller, Get, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.model";
import { GetTasksQueryDto } from "./dto/gettasksquery.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Query() queryParams: GetTasksQueryDto): Task[]
  {
    return this.tasksService.getFilteredTasks(queryParams);
  }
}

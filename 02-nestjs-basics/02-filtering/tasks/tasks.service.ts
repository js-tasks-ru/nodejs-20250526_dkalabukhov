import { Injectable } from "@nestjs/common";
import { OrderOptions, Task, TaskStatus } from "./task.model";
import { GetTasksQueryDto } from "./dto/gettasksquery.dto";
import { orderByStatus, orderByTitle } from "../helpers/orderBy";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: "1",
      title: "Task 1",
      description: "First task",
      status: TaskStatus.PENDING,
    },
    {
      id: "2",
      title: "Task 2",
      description: "Second task",
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: "3",
      title: "Task 3",
      description: "Third task",
      status: TaskStatus.COMPLETED,
    },
    {
      id: "4",
      title: "Task 4",
      description: "Fourth task",
      status: TaskStatus.PENDING,
    },
    {
      id: "5",
      title: "Task 5",
      description: "Fifth task",
      status: TaskStatus.IN_PROGRESS,
    },
  ];

  public getFilteredTasks(queryParams: GetTasksQueryDto): Task[] {
    const {
      status,
      page = 1,
      limit = Number.MAX_SAFE_INTEGER,
      orderBy
    } = queryParams;

    let filteredTasks = [...this.tasks];

    if (status) {
      filteredTasks = filteredTasks.filter((task) => task.status === status);
    }

    filteredTasks = filteredTasks.slice((page - 1) * limit, page * limit);

    if (orderBy === OrderOptions.TITLE) {
      filteredTasks = orderByTitle(filteredTasks);
    } else if (orderBy === OrderOptions.STATUS) {
      filteredTasks = orderByStatus(filteredTasks);
    }

    return filteredTasks;
  }
}

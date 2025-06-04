import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";

@Module({
  imports: [NotificationsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, NotificationsService, UsersService],
})
export class TasksModule {}

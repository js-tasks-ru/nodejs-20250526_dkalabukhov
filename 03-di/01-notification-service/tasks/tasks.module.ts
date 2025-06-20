import { Module } from "@nestjs/common";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { NotificationsModule } from "../notifications/notifications.module";
import { NotificationsService } from "../notifications/notifications.service";
import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { EmailSender, SmsSender } from "../config/notification.config";

@Module({
  imports: [
    NotificationsModule.forRoot(
      new EmailSender(),
      new SmsSender(),
    ),
    UsersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, NotificationsService, UsersService],
})
export class TasksModule {}

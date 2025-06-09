import { CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";

export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (request.headers["x-role"] === "admin") {
      return true;
    }

    throw new ForbiddenException('Доступ запрещён: требуется роль admin');
  }
}

import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./passport/jwt.stategy";
import { GoogleStrategy } from "./passport/google.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'killer-is-jim',
      signOptions: { expiresIn: '1h' },
      global: true,
    })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}

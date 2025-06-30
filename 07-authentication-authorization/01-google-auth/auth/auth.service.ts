import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: User) {
    return this.issueToken(user);
  }

  async issueToken(user: User) {
    const token = await this.jwtService.signAsync({ sub: user.id });
    return { token };
  }
}

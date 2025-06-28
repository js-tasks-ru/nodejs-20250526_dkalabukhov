import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-google-oauth20";
import { Injectable } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: 'mockClientId',
      clientSecret: 'mockClientSecret',
      callbackURL: 'http://localhost:3000/auth/google/callback',
    })
  }
  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    // Здесь, на мой взгляд, лучше бы по email'у искать, ведь id в реальном
    // профиле не будет вообще.
    const user = await this.usersService.findOne(profile.id);
    if (!user) {
      return this.usersService.create({
        id: profile.id,
        displayName: profile.displayName,
        avatar: profile.photos[0].value,
      });
    }
    return user;
  }
}

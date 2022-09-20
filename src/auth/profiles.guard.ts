import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './auth-jwt.guard';
import { AuthService } from './auth.service';

@Injectable()
export class ProfilesGuard extends JwtAuthGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {
    super(reflector);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let status = false;
    const baseGuardResult = await super.canActivate(context);
    if (!baseGuardResult) {
      // unsuccessful authentication return false
      return false;
    }
    const profiles = this.reflector.get<string[]>(
      'profiles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    if (request?.query?.token) {
      const blacklistToken = await this.authService.checkBlacklist(
        request?.query?.token,
      );
      status = blacklistToken ? false : true;
    }

    if (request?.user && profiles) {
      const { username } = request.user;
      const user = await this.authService.findUser(username);
      status = profiles.includes(user.profile);
    }

    return status;
  }
}

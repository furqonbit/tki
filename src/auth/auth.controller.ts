import {
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { JwtAuthGuard } from './auth-jwt.guard';
import { LocalAuthGuard } from './auth-local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req): Promise<any> {
    return this.authService.generateToken(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  async logout(@Query('token') token: string): Promise<any> {
    return this.authService.logout(token);
  }
}

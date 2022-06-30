import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {

  constructor(private authService: AuthService,
              private userService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('chatroom')
  enterChatroom(@Request() req) {
    return req.user;
  }

  @Post('auth/register')
  register(@Request() req){
    return this.userService.createOne(req.body.username,req.body.password);
  }
}
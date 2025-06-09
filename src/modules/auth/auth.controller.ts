import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/request/auth/register-user.dto';
import { UserService } from '../user/user.service';
import { LoginDto } from 'src/dtos/request/auth/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async register(@Body() request: RegisterUserDto) {
    return this.userService.create(request);
  }

  @Post('login')
  async login(@Body() request: LoginDto) {
    return this.authService.login(request);
  }
}

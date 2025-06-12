import { Body, Controller, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UpdateUserDto } from 'src/dtos/request/user/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Put()
  async register(@Body() request: UpdateUserDto) {
    return this.userService.update(request);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dtos/request/auth/register-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/request/user/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(request: RegisterUserDto) {
    const entity = this.userRepository.create(request);
    entity.password = await bcrypt.hash(entity.password, 10);
    return await this.userRepository.save(entity);
  }

  async update(request: UpdateUserDto) {
    const entity = this.userRepository.create(request);
    const user = await this.userRepository.update(request.id, entity);
    return user;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
      select: { id: true },
    });
  }
}

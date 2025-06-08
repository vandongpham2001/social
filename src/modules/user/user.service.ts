import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/dtos/request/register-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  create(request: RegisterUserDto) {
    const user = this.repo.create(request);
    return this.repo.save(user);
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.repo.findOne({ where: { id } });
  }
}

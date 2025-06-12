import { Injectable } from '@nestjs/common';
import { LoginDto } from 'src/dtos/request/auth/login.dto';
import { UnauthorizedException } from 'src/exceptions/unauthorized.exception';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { Constant } from 'src/constants/constant';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) { }

  async login(request: LoginDto) {
    const user = await this.userService.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValid = await bcrypt.compare(request.password, user.password);
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.generateToken(user);

    return {
      accessToken,
    }
  }

  private generateToken(user: UserEntity) {
    const now = Math.floor(Date.now() / 1000);
    const expireIn = parseInt(
      process.env.JWT_EXPIRE_IN || Constant.JWT.DEFAULT.EXPIRE_IN,
    );

    const payload = {
      id: user.id,
      sub: user.email,
      iss: process.env.JWT_ISSUER,
      iat: now,
      exp: now + expireIn,
      jti: uuidv4(),
    };
    const token = this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRE_IN,
    });

    return { token };
  }
}

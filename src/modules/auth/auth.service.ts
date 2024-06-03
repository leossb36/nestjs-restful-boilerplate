import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthModelView } from './model-view/auth.mv';
import { MESSAGES } from '../common/constants/message';
import { GetAuthByUsernameUseCase } from './use-case/get-auth-by-username.use-case';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly getAuthByUsernameUseCase: GetAuthByUsernameUseCase,
  ) {}

  async authGetByUsername(username: string): Promise<AuthModelView> {
    return await this.getAuthByUsernameUseCase.execute(username);
  }

  // change any type for the entity type, e.g: UserEntity
  async login(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
        expiresIn: process.env.EXPIRES_TIME,
      }),
    };
  }

  // change any type for the entity type, e.g: UserEntity
  async refreshToken(user: any) {
    const payload = {
      sub: user.id,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        algorithm: 'HS256',
      }),
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.authGetByUsername(username);

    const isPasswordValid = await bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(MESSAGES.INVALID_USER);
    }

    return user;
  }
}

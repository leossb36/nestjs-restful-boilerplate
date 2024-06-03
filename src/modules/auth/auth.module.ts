import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '@common/strategies/local.strategy';
import { JwtStrategy } from '@common/strategies/jwt.strategy';
import { RefreshTokenStrategy } from '@app/common/strategies/refresh-token.strategy';
import { LoginValidationMiddleware } from '@app/common/middleware/jwt.middleware';
import { GetAuthByUsernameUseCase } from './use-case/get-auth-by-username.use-case';
import { IAuthRepository } from '../interfaces/auth.interface';
import { AuthRepository } from '../infra/repositories/auth.repository';
// import { UserModule } from '../user/user.module';

// if you need create UserModule to pass as injection dependecy on auth module

@Module({
  imports: [
    // UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '5h' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    RefreshTokenStrategy,
    JwtStrategy,
    GetAuthByUsernameUseCase,
    { provide: IAuthRepository, useClass: AuthRepository },
  ],
  controllers: [AuthController],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoginValidationMiddleware).forRoutes('/api/auth/login');
  }
}

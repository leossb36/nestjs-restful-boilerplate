import { Module } from '@nestjs/common';
import { SwaggerModule } from '@common/swagger/swagger.module';
import { InfraModule } from '@config/infra.module';
import { HealthCheckController } from './modules/healthcheck/healthcheck.controller';
import { GracefulShutdownModule } from 'nestjs-graceful-shutdown';
import { AuthModule } from './modules/auth/auth.module';

const restImports = [InfraModule, SwaggerModule, AuthModule];

@Module({
  imports: [GracefulShutdownModule.forRoot(), ...restImports],
  controllers: [HealthCheckController],
})
export class AppModule {}

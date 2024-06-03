import { ErrorsInterceptor } from '@common/interceptors/errors.interceptor';
import { SwaggerService } from '@common/swagger/swagger.service';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from './configuration.config';
import { AppModule } from '@app/app.module';
import { setupGracefulShutdown } from 'nestjs-graceful-shutdown';

export class ServerConfig {
  private configService: ConfigService;
  private swaggerService: SwaggerService;
  constructor() {
    this.configService = new ConfigService();
    this.swaggerService = new SwaggerService();
  }

  async init() {
    const app = await NestFactory.create(AppModule, { cors: true });
    const prefix = this.configService.get('server').prefix;
    setupGracefulShutdown({ app });

    app.useGlobalInterceptors(new ErrorsInterceptor());
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    app.setGlobalPrefix(prefix);
    this.swaggerService.init(app);

    const port: number = +process.env.PORT || 3000;
    const host: string = process.env.HOSTNAME;
    await app
      .listen(port, host)
      .then(() => {
        console.log(`Listening on port: http://${host}:${port}`);
        console.log(
          process.env.NODE_ENV === 'development'
            ? `http://${host}:${port}${prefix}/docs`
            : '',
        );
      })
      .catch((err) => {
        console.log(`Unable to stabilish connection:: ${err.message}`);
      });
  }
}

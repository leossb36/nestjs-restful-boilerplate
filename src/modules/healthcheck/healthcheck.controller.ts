import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HealthCheck')
@Controller()
export class HealthCheckController {
  @Get('health-check')
  getHealthCheck() {
    return { message: 'online' };
  }
}

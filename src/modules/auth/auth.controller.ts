import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/auth.decorator';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards/local-auth.guard';
import { AuthRequest } from './dto/auth-request.dto';
import { RefreshJwtAuthGuard } from '@app/common/guards/refresh-jwt-auth.guard';
import { Requester } from '@app/common/decorators/user.decorator';
import { JwtAuthGuard } from '@app/common/guards/jwt-auth.guard';
import { AuthModelView } from './model-view/auth.mv';
import { AuthenticationDto, RefreshTokenDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiBody({ type: AuthenticationDto })
  async login(@Req() req: AuthRequest) {
    return await this.authService.login(req.user);
  }

  @Public()
  @UseGuards(RefreshJwtAuthGuard)
  @ApiBody({ type: RefreshTokenDto })
  @Post('/refresh')
  async refresh(@Req() req: AuthRequest) {
    return await this.authService.refreshToken(req.user);
  }

  @Get('/user')
  @UseGuards(JwtAuthGuard)
  async findOne(
    @Requester(new ValidationPipe({ validateCustomDecorators: true }))
    user: AuthModelView,
  ) {
    console.log(user);
  }
}

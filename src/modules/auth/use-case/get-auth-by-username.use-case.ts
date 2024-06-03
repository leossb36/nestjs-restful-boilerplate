import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { AuthModelView } from '../model-view/auth.mv';
import { MESSAGES } from '@app/modules/common/constants/message';
import { IAuthRepository } from '@app/modules/interfaces/auth.interface';

@Injectable()
export class GetAuthByUsernameUseCase {
  constructor(
    @Inject(IAuthRepository)
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(username: string): Promise<AuthModelView> {
    if (!username) {
      throw new BadRequestException(MESSAGES.NOT_FOUND);
    }

    const response = await this.authRepository.getByUsername(username);

    if (!response) {
      throw new BadRequestException(MESSAGES.ERROR);
    }

    return response;
  }
}

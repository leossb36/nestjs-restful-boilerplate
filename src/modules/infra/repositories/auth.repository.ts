import { IAuthRepository } from '@app/modules/interfaces/auth.interface';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { AuthModelView } from '@app/modules/auth/model-view/auth.mv';
import * as bcrypt from 'bcrypt';

export class AuthRepository implements IAuthRepository {
  // constructor(
  //   @InjectRepository(yourEntityRepository)
  //   private readonly authRepository: Repository<yourEntityRepository>,
  // ) {}

  async getByUsername(username: string): Promise<AuthModelView> {
    const password = await bcrypt.hash('teste123', 10);
    return {
      id: 123,
      username,
      firstname: 'John',
      lastname: 'Doe',
      password, // hidden property
    };
  }
}

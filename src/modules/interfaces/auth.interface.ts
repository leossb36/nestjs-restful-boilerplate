import { AuthModelView } from '../auth/model-view/auth.mv';

export interface IAuthRepository {
  getByUsername(username: string): Promise<AuthModelView>;
}
export const IAuthRepository = Symbol('IAuthRepository');

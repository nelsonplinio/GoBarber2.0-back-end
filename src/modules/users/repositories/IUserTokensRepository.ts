import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export interface IGenerateData {
  user_id: string;
}

export default interface IUserTokensRepository {
  generate(data: IGenerateData): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
}

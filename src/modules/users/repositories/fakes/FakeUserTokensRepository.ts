import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import { uuid } from 'uuidv4';
import IUserTokensRepository, { IGenerateData } from '../IUserTokensRepository';

class FakeUserTokensRepository implements IUserTokensRepository {
  private userTokens: UserToken[] = [];

  public async generate({ user_id }: IGenerateData): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userTokens.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUserTokensRepository;

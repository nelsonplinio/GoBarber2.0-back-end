import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const CACHE_KEY = `providers-list:${user_id}`;

    let providers = await this.cacheProvider.recover<User[]>(CACHE_KEY);

    if (!providers) {
      providers = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      this.cacheProvider.save({
        key: CACHE_KEY,
        value: providers,
      });
    }

    return providers;
  }
}

export default ListProvidersService;

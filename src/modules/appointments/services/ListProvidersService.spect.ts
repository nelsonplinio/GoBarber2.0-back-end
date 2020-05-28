import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProvidersServices: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProvidersServices = new ListProvidersService(fakeUsersRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'Nelson 1',
      email: 'nelson@2golbarber.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'Nelson 3',
      email: 'nelson@3golbarber.com',
      password: '123456',
    });

    const providers = await listProvidersServices.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});

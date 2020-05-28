import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateUserProfileService from './UpdateUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateUserProfileService;

describe('UpdateUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateUserProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'nelson@gobarber.com',
      name: 'Nelson Plínio',
    });

    expect(updatedUser.name).toBe('Nelson Plínio');
    expect(updatedUser.email).toBe('nelson@gobarber.com');
  });

  it('should not be able to update the user profile when user not exist', async () => {
    await expect(
      updateProfileService.execute({
        user_id: 'id-not-exist',
        email: 'nelson@gobarber.com',
        name: 'Nelson Plínio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@gobarber.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'nelson@gobarber.com',
        name: 'Nelson Plínio',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      email: 'nelson@gobarber.com',
      name: 'Nelson Plínio',
      password: '123123',
      old_password: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old_password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'nelson@gobarber.com',
        name: 'Nelson Plínio',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        email: 'nelson@gobarber.com',
        name: 'Nelson Plínio',
        password: '123123',
        old_password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

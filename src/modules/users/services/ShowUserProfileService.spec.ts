import 'reflect-metadata';

import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowUserProfileService from './ShowUserProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfileService: ShowUserProfileService;

describe('ShowUserProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfileService = new ShowUserProfileService(fakeUsersRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Nelson',
      email: 'nelson@golbarber.com',
      password: '123456',
    });

    const userToShow = await showProfileService.execute({
      user_id: user.id,
    });

    expect(userToShow.id).toBe(user.id);
    expect(userToShow.name).toBe(user.name);
    expect(userToShow.email).toBe(user.email);
    expect(userToShow.password).toBeUndefined();
  });

  it('should not be able to show user profile when not found', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'user-id-not-existing',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

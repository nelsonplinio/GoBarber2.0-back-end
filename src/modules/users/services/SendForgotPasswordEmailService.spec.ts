import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendEmailMethod = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@doe.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'John@doe.com',
    });

    expect(sendEmailMethod).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'John@doe.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const sendEmailMethod = jest.spyOn(fakeMailProvider, 'sendMail');
    const generateTokenMethod = jest.spyOn(
      fakeUserTokensRepository,
      'generate',
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@doe.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'John@doe.com',
    });

    expect(sendEmailMethod).toHaveBeenCalled();
    expect(generateTokenMethod).toHaveBeenCalledWith({ user_id: user.id });
  });
});

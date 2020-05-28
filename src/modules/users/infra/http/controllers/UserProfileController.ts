import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserProfileService from '@modules/users/services/UpdateUserProfileService';
import ShowUserProfileService from '@modules/users/services/ShowUserProfileService';

export default class UserProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const showUserProfile = container.resolve(ShowUserProfileService);

    const user = await showUserProfile.execute({
      user_id,
    });

    delete user.password;

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { name, email, password, old_password } = request.body;

    const updateProfile = container.resolve(UpdateUserProfileService);

    const userUpdated = await updateProfile.execute({
      email,
      name,
      user_id,
      old_password,
      password,
    });

    return response.json(userUpdated);
  }
}

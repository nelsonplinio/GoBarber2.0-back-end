import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import UserProfileController from '../controllers/UserProfileController';

const userProfileRouter = Router();

const userProfileController = new UserProfileController();

userProfileRouter.put('/', ensureAuthenticated, userProfileController.update);
userProfileRouter.get(
  '/:user_id',
  ensureAuthenticated,
  userProfileController.show,
);

export default userProfileRouter;

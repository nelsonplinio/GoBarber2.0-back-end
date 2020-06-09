import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRoutes = Router();
const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRoutes.use(ensureAuthenticated);

providersRoutes.get('/', providersController.index);

providersRoutes.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

providersRoutes.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);

export default providersRoutes;

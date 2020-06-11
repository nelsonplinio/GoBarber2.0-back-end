import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month, day } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    const providers = await listProviderDayAvailability.execute({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      provider_id,
    });

    return response.json(providers);
  }
}

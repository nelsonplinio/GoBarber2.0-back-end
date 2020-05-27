import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointmnentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmnentService.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

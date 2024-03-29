import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    let parsedDate: Date;

    if (!(date instanceof Date)) {
      parsedDate = parseISO(date);
    } else {
      parsedDate = date;
    }

    const createAppointmnentService = container.resolve(
      CreateAppointmentService,
    );

    const appointment = await createAppointmnentService.execute({
      provider_id,
      user_id,
      date: parsedDate,
    });

    return response.json(appointment);
  }
}

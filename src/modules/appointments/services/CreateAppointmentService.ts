import { injectable, inject } from 'tsyringe';
import { startOfHour, isBefore, getHours, format } from 'date-fns';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment to your self");
    }

    const appointmentDate = startOfHour(date);

    if (isBefore(date, Date.now())) {
      throw new AppError("You can't create an appointment on pass date");
    }

    /**
     * Verificar se o hora do agendamente está no range disponivel do provedor.
     */
    const appointmentHour = getHours(appointmentDate);
    if (appointmentHour < 8 || appointmentHour > 18) {
      throw new AppError(
        "You can't create an appointment before 8 or after 8pm",
      );
    }

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para o dia ${dateFormatted}.`,
    });

    this.cacheProvider.invalidate(
      `provider-appointments:${provider_id}:${format(date, 'yyyy-M-d')}`,
    );

    return appointment;
  }
}

export default CreateAppointmentService;

import { inject, injectable } from 'tsyringe';

import { getDaysInMonth, getDate, isBefore } from 'date-fns';

import IAppointmnentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRespository: IAppointmnentsRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const numbersOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numbersOfDaysInMonth },
      (_, index) => index + 1,
    );

    const currentDate = new Date(Date.now());
    const compareDate = new Date(year, month);

    if (isBefore(compareDate, currentDate)) {
      const availability = eachDayArray.map(day => {
        return {
          day,
          available: false,
        };
      });

      return availability;
    }

    const appointments = await this.appointmentsRespository.findAllInMonthFromProvider(
      {
        month,
        year,
        provider_id,
      },
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day; // getDate pega o dia da data que está passando.
      });

      return {
        day,
        available: appointmentsInDay.length < 10, // 8h até 17h cada agendamento tem uma hora
      };
    });

    return availability;
  }
}

export default ListProviderMonthAvailabilityService;

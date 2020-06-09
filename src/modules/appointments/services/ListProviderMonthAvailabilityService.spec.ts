import 'reflect-metadata';

import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the month availability from provider', async () => {
    const currentMonth = new Date().getMonth();

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 20, 8, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 9, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 10, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 11, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 12, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 13, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 14, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 14, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 15, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 16, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 17, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 30, 18, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    await fakeAppointmentsRepository.create({
      date: new Date(2020, currentMonth, 31, 8, 0, 0),
      provider_id: '1',
      user_id: '2',
    });

    const availability = await listProviderMonthAvailability.execute({
      provider_id: '1',
      year: 2020,
      month: currentMonth + 1,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: true },
        { day: 21, available: true },
        { day: 22, available: true },
        { day: 30, available: false },
      ]),
    );
  });
});

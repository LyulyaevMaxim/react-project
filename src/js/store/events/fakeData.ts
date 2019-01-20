import { IPlace, IEvent } from './reducer.d'

export const mockPlacesData: Array<IPlace> = [
  { placeId: 'id0', name: { value: 'Нижний Новгород' } },
  { placeId: 'id1', name: { value: 'Саров' } },
  { placeId: 'id2', name: { value: 'Арзамас' } },
]

export const mockEventsData: Array<IEvent> = [
  {
    eventId: 'id0',
    name: { value: 'Мероприятие 1' },
    date: { value: '20.08.2017' },
    place: { value: 'id0' },
  },
  {
    eventId: 'id1',
    name: { value: 'Мероприятие 2' },
    date: { value: '13.09.2017' },
    place: { value: 'id1' },
  },
  {
    eventId: 'id2',
    name: { value: 'Мероприятие 3' },
    date: { value: '03.10.2017' },
    place: { value: 'id2' },
  },
]
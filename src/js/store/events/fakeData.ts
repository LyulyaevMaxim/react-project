import { IPlace, IEvent } from './reducer.d'
import { faker } from '~utils/testHelper/fakeData'
import { moment } from '~utils/date'

const getFakeDate = () => moment(faker.date.past()).format('DD.MM.YYYY')

export const mockPlacesData: Array<IPlace> = Array.from({ length: 3 }, _ => ({
  placeId: faker.address.zipCode(),
  name: { value: faker.address.city() },
}))

export const mockEventsData: Array<IEvent> = Array.from({ length: 30 }, _ => ({
  eventId: faker.random.uuid(),
  name: { value: faker.random.words() },
  date: { value: getFakeDate() },
  place: { value: mockPlacesData[Math.floor(Math.random() * mockPlacesData.length)].placeId },
}))

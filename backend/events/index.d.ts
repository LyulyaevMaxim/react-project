type Errors = Array<string>

export interface IServerEvent {
  eventId: string
  name: { value: string }
  date: { value: string }
  place: { value: string }
}

export interface IServerEventsList {
  success: { meta: any; result: Array<IServerEvent> }
  fail: {
    errors: Errors
  }
}

export interface IServerSaveEvent {
  success: IServerEvent
  fail: {
    name?: { errors: Errors }
    date?: { errors: Errors }
    place?: { errors: Errors }
  }
}

export interface IServerDeleteEvent {
  success: {}
  fail: {
    errors: Array<{ eventId: IServerEvent['eventId']; error: string }>
  }
}

export interface IServerPlace {
  placeId: string
  name: { value: string }
}

export interface IServerPlaces {
  success: {
    result: Array<IServerPlace>
  }
}

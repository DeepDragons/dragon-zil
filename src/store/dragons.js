import { createDomain,createEvent } from 'effector'

const DragonsPage = createDomain('dragons-page')

export const addDragons = createEvent()

DragonsPage.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
DragonsPage.onCreateStore(store => {
  console.log('new store: ', store.getState())
})

export const DragonsStore = DragonsPage
  .createStore({})
  .on(addDragons, (_, result) => result)

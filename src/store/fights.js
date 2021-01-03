import { createDomain,createEvent } from 'effector'

const FightsPage = createDomain('fights-page')

export const addDragons = createEvent()

FightsPage.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
FightsPage.onCreateStore(store => {
  console.log('new store: ', store.getState())
})

export const FightsStore = FightsPage
  .createStore({})
  .on(addDragons, (_, result) => result)

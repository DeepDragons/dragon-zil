import { createDomain,createEvent } from 'effector'

const tokenUris = createDomain('token_uris')

export const updateURLs = createEvent()

tokenUris.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
tokenUris.onCreateStore(store => {
  console.log('new store: ', store.getState())
})

export const tokensURLSStore = tokenUris
  .createStore({})
  .on(updateURLs, (_, result) => result)

import { createDomain,createEvent } from 'effector'

const Wallet = createDomain('wallet')

export const changeAddress = createEvent()

Wallet.onCreateEvent(event => {
  console.log('new event: ', event.getType())
})
Wallet.onCreateStore(store => {
  console.log('new store: ', store.getState())
})

export const WalletStore = Wallet
  .createStore('')
  .on(changeAddress, (_, address) => address)

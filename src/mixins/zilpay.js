import MicroModal from 'micromodal'

export default {
  data() {
    return {
      __netwrok: 'testnet',
      __crowdSale: '0xC07bd718e7573fB59Fb79657E05d78f50113951B',
      __DragonZIL: '0xdF837Fb50a2cc15AE329f5C3C8CCE25B2C5b18E3'
    }
  },
  methods: {
    __getZilPay() {
      if (typeof window['zilPay'] !== 'undefined') {
        return Promise.resolve(window['zilPay'])
      }

      return new Promise((resolve, reject) => {
        let k = 0
        const i = setInterval(() => {
          if (k >= 10) {
            clearInterval(i)
            MicroModal.show('no-zipay')
            return reject('ZilPay inot installed')
          }
          
          if (typeof window['zilPay'] !== 'undefined') {
            clearInterval(i)
            return resolve(window['zilPay'])
          }

          k++
        }, 100)
      })
    },
    async __callAirDrop(payload) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__crowdSale)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'AirDrop',
        [
          {
            vname: 'address',
            type: 'ByStr20',
            value: `0x${payload.msg}`
          },
          {
            vname: 'signature',
            type: 'ByStr64',
            value: `0x${payload.signature}`
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(9000)
        }
      )
    },
    async __buy(_amount) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__crowdSale)
      const amount = utils.units.toQa(_amount, utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Buy',
        [],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(9000)
        }
      )
    },
    async __net() {
      const zilPay = await this.__getZilPay()
      let { net } = zilPay.wallet

      if (!net) {
        net = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(zilPay.wallet.net)
          }, 500)
        })
      }

      if (net !== this.__netwrok) {
        MicroModal.show('no-netwrok')

        return false
      }

      return true
    },
    async __connect() {
      const zilPay = await this.__getZilPay()

      if (zilPay.wallet.isConnect && zilPay.wallet.isEnable) {
        return true
      }

      const connected = await zilPay.wallet.connect()

      return connected
    },
    async __getTokenPrice() {
      const zilPay = await this.__getZilPay()

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__crowdSale, 'current_price')

      return result['current_price']
    },
    async __getTotalSupply() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, 'total_supply')

      return result['total_supply']
    },
    async __getTokensIds() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { base16 } = zilPay.wallet.defaultAccount
      const address = String(base16).toLowerCase()
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, 'tokens_owner_stage', [address])
      
      if (!result || !result['tokens_owner_stage'] || !result['tokens_owner_stage'][address]) {
        return {}
      }

      try {
        const listOfToken = result['tokens_owner_stage'][address]

        return listOfToken
      } catch (err) {
        return {}
      }
    },
    __trim(string, length = 6) {
      if (!string) {
        return null
      }
    
      let part0 = string.substr(0, length)
      let part1 = string.substr(length * -1)
    
      return `${part0}...${part1}`
    }
  }
}

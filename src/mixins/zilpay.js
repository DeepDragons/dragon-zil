export default {
  data() {
    return {
      __crowdSale: '0x114c689342a3659175CAad2532A97DC16B8a9eA8',
      __DragonZIL: '0xC73fbD9374Be35F506f513372deFf4E81706d318'
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
    async __connect() {
      const zilPay = await this.__getZilPay()

      if (zilPay.wallet.isConnect) {
        return true
      }

      return await zilPay.wallet.connect()
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

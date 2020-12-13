import MicroModal from 'micromodal'

export default {
  data() {
    return {
      __netwrok: 'mainnet',
      __crowdSale: 'zil15ks9t9ve0fp3de06w0aaum3yqz9a39jnzgalet',
      __DragonZIL: 'zil1apmtzy4x9729fp8du8euehttptr08yuzamfy9f'
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
    async __buy(_amount) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__crowdSale)
      const amount = utils.units.toQa(_amount, utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 9000;

      if (!isNet) {
        return false
      }

      if (Number(_amount) > 5) {
        gasLimit = 9000;
      }

      return await contract.call(
        'Buy',
        [],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit * _amount)
        }
      )
    },
    async __nextStage(token_id) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__DragonZIL)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'UpStage',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(token_id)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(3000)
        }
      )
    },
    async __transfer(address, token_id) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__DragonZIL)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Transfer',
        [
          {
            vname: 'to',
            type: 'ByStr20',
            value: address
          },
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(token_id)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(9000)
        }
      )
    },
    async __burn(token_id) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__DragonZIL)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Burn',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(token_id)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
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
    async __getIncrementer() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__crowdSale, 'incrementer')

      return result['incrementer']
    },
    async __getCombatGen(id) {
      if (isNaN(id)) {
        return null
      }

      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()
      const field = 'token_gen_battle'

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, field, [String(id)])

      return result[field][String(id)]
    },
    async __getTotalSupply() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, 'token_id_count')

      return result['token_id_count']
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
        return result['tokens_owner_stage'][address]
      } catch (err) {
        return {}
      }
    },
    async __isGotDragon() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { base16 } = zilPay.wallet.defaultAccount
      const address = String(base16).toLowerCase()
      const field = 'is_dragon_owner'
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__crowdSale, field, [address])

      if (!result || !result[field] || !result[field][address]) {
        return false
      }

      return true
    },
    async __getTokenOwner(tokenID) {
      const field = 'token_owners'
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, field, [tokenID])

      if (!result || !result[field] || !result[field][tokenID]) {
        return {}
      }

      try {
        return result[field][tokenID]
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

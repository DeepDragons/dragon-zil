import MicroModal from 'micromodal'
import BN from 'bn.js'
import { updateURLs } from '@/store/urls'

// __crowdSale: '0xA5A05595997A4316e5fA73fbde6e24008Bd89653',
// __DragonZIL: '0xe876b112A62f945484edE1f3cCdd6B0ac6F39382',
// __FightPlace: '0x3DD25E4E4a7753D7f21ECEC9d926c25dcf696169',
// __CrowdSaleForZLP: '0x6f2094d3fc4b08e0a19347e9501f675fd58c2192',
// __GenLab: '0x295dd4be95d74fae4a57bad437e7c0b9ed2b4e92',
// __ZLP: '0xfbd07e692543d3064B9CF570b27faaBfd7948DA4',
// __BreedPlace: '0x5a4e6Ef3A6fff78bE5EDdc4f2c1D7100d78Bb4bf',
// __MarketPlace: '0x91a4212032ff3e36453d948e5560a63445abcbcc'

export default {
  data() {
    return {
      __netwrok: 'testnet',
      __crowdSale: '0x548510c718825e54ee048fce4dbf7c0de4f63225',
      __DragonZIL: '0xc172172f05ebf4df2a64cb35f9d85dac869f4150',
      __FightPlace: '0x3DD25E4E4a7753D7f21ECEC9d926c25dcf696169',
      __GenLab: '0x295dd4be95d74fae4a57bad437e7c0b9ed2b4e92',
      __ZLP: '0x6b54e53d7472429b220d23a4365592367ac22c88',
      __BreedPlace: '0x5a4e6Ef3A6fff78bE5EDdc4f2c1D7100d78Bb4bf',
      __MarketPlace: '0x91a4212032ff3e36453d948e5560a63445abcbcc'
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
    async __getTokenUris() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()
      const field = 'token_uris'

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, field)

      updateURLs(result[field])

      return result[field]
    },
    async __buyOnMarketPlace(id, amount) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__MarketPlace)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 5000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Purchase',
        [
          {
            vname: 'purchase_order_id',
            type: 'Uint256',
            value: id
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    },
    async __cancelListing(id) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__MarketPlace)
      const amount = utils.units.toQa("0", utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 5000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'CancelListing',
        [
          {
            vname: 'cancel_order_id',
            type: 'Uint256',
            value: id
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    },
    async __getTokenApprovals(tokenId) {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()
      const field = 'token_approvals'
      const _id = String(tokenId)

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__DragonZIL, field, [_id])

      return result[field][_id]
    },
    async __getDragonsForSale() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()
      const field = 'orderbook'

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__MarketPlace, field)

      return result[field]
    },
    async __setApprove(address, token_id) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__DragonZIL)
      const amount = utils.units.toQa("0", utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 5000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'SetApprove',
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
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    },
    async __sendToMarketPlace(token_id, _amount) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__MarketPlace)
      const amount = utils.units.toQa("0", utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 9000;

      if (!isNet) {
        return false
      }

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Sell',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(token_id)
          },
          {
            vname: 'price',
            type: 'Uint128',
            value: String(_amount)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
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
      let gasLimit = 25000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'Buy',
        [
          {
            vname: 'refAddr',
            type: 'ByStr20',
            value: '0x0000000000000000000000000000000000000000'
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
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
      const field = 'zil_incrementer'

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__crowdSale, field)

      return result[field]
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
    async __getVisualGen(id) {
      if (isNaN(id)) {
        return null
      }

      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()
      const field = 'token_gen_image'

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
    async __getWaitingList() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }
      const field = 'waiting_list'
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__FightPlace, field)

      if (!result || !result[field]) {
        return {}
      }

      try {
        return result[field]
      } catch (err) {
        return {}
      }
    },
    async __getDragonForFight(tokenID) {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }
      const field = 'waiting_list'
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__FightPlace, field, [String(tokenID)])

      if (!result || !result[field]) {
        return '0'
      }

      try {
        return result[field][String(tokenID)]
      } catch (err) {
        return '0'
      }
    },
    async __placeToWaitList(token_id, price) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__FightPlace)
      const amount = utils.units.toQa("0", utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 9000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'WaitListAddDel',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(token_id)
          },
          {
            vname: 'fight_price',
            type: 'Uint128',
            value: String(price)
          }
        ],        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
    },
    async __fightStart(id0, id1) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__FightPlace)
      const amount = utils.units.toQa("0", utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      let gasLimit = 15000;

      if (!isNet) {
        return false
      }

      return await contract.call(
        'FightStart',
        [
          {
            vname: 'who_id',
            type: 'Uint256',
            value: String(id1)
          },
          {
            vname: 'with_id',
            type: 'Uint256',
            value: String(id0)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(gasLimit)
        }
      )
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
    async __getZLPBalance() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { base16 } = zilPay.wallet.defaultAccount
      const address = String(base16).toLowerCase()
      const field = 'balances';
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__ZLP, field, [address])

      if (!result || !result[field] || !result[field][address]) {
        return '0'
      }

      try {
        return result[field][address]
      } catch (err) {
        return '0'
      }
    },
    async __getStorebalance() {
      const zilPay = await this.__getZilPay()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { base16 } = zilPay.wallet.defaultAccount
      const address = String(base16).toLowerCase()
      const field = 'balances';
      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__ZLP, field, [address])

      if (!result || !result[field] || !result[field][address]) {
        return '0'
      }

      try {
        return result[field][address]
      } catch (err) {
        return '0'
      }
    },
    async __getZLPDragonPrice() {
      const zilPay = await this.__getZilPay()
      const field = 'zlp_price'

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__crowdSale, field)

      return result[field]
    },
    async __buyForZLP(ZLPamount) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__ZLP)
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
            value: this.__crowdSale
          },
          {
            vname: 'amount',
            type: 'Uint128',
            value: String(ZLPamount)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(25000)
        }
      )
    },
    async __getGenPrice(id) {
      const zilPay = await this.__getZilPay()
      const field0 = 'price_multiplicator'
      const field1 = 'start_price'
      const field2 = 'use_count'

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const getPriceMultiplicator = async () => {
        const { result } = await zilPay
          .blockchain
          .getSmartContractSubState(this.__GenLab, field0)

        return result[field0]
      }
      const getStartPrice = async () => {
        const { result } = await zilPay
          .blockchain
          .getSmartContractSubState(this.__GenLab, field1)

        return result[field1]
      }
      const getUseCount = async () => {
        const { result } = await zilPay
          .blockchain
          .getSmartContractSubState(this.__GenLab, field2, [String(id)])

          if (result && result[field2] && result[field2][String(id)]) {
          return result[field2][String(id)]
        }

        return '1'
      }
      const [priceMultiplicator, startPrice, useCount] = await Promise.all([
        getPriceMultiplicator(),
        getStartPrice(),
        getUseCount()
      ])
      console.log(priceMultiplicator, startPrice,useCount )
      const _priceMultiplicator = new BN(priceMultiplicator)
      const _startPrice = new BN(startPrice)
      const _useCount = new BN(useCount)
      const _multiplicator = _priceMultiplicator.pow(_useCount)
      const _amount = _startPrice.mul(_multiplicator)

      return String(_amount)
    },
    async __changeGen(genNum, tokenID) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__GenLab)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'ChangeGen',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(tokenID)
          },
          {
            vname: 'gen_num',
            type: 'Uint256',
            value: String(genNum)
          },
          {
            vname: 'new_value',
            type: 'Uint256',
            value: String(99)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
        }
      )
    },
    async __getMinBreedPrice() {
      const zilPay = await this.__getZilPay()
      const field = 'breed_min_price_fld'

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__BreedPlace, field)

      return result[field]
    },
    async __getBreedingList() {
      const zilPay = await this.__getZilPay()
      const field = 'waiting_list'

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__BreedPlace, field)

      return result[field]
    },
    async __addToBreedPlace(zlpAmount, tokenId) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__BreedPlace)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'WaitListAddDel',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(tokenId)
          },
          {
            vname: 'breed_price',
            type: 'Uint128',
            value: String(zlpAmount)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
        }
      )
    },
    async __breedStart(firstID, secondID) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__BreedPlace)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'BreedStart',
        [
          {
            vname: 'who_id',
            type: 'Uint256',
            value: String(firstID)
          },
          {
            vname: 'with_id',
            type: 'Uint256',
            value: String(secondID)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(25000)
        }
      )
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

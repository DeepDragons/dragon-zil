import MicroModal from 'micromodal'
import BN from 'bn.js'
import { updateURLs } from '@/store/urls'

export default {
  data() {
    return {
      __netwrok: 'mainnet',
      __crowdSale: '0x4260353646067b5e54f906d4a3dcee8385904f01',
      __DragonZIL: '0xb4d83becb950c096b001a3d1c7abb10f571ae75f',
      __FightPlace: '0x21b870dc77921b21f9a98a732786bf812888193c',
      __GenLab: '0x8a30485597ebcc1be49e75261de83d30e4a9d1e7',
      __ZLP: '0xfbd07e692543d3064b9cf570b27faabfd7948da4',
      __BreedPlace: '0x71435501608be1993c4146f9cabfa3f547205f6f',
      __MarketPlace: '0x26637d6daddbb936c64bd4e2d9b4d4d3db30ee21',
      __MultiSig: '0x54fb9f7e7b6423677d4ffd67b53d452f6d0fa509'
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
        .getSmartContractSubState(this.__crowdSale, 'zil_price')

      return result['zil_price']
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

        return '0'
      }
      const [priceMultiplicator, startPrice, useCount] = await Promise.all([
        getPriceMultiplicator(),
        getStartPrice(),
        getUseCount()
      ])
      const _priceMultiplicator = new BN(priceMultiplicator)
      const _startPrice = new BN(startPrice)
      const _useCount = new BN(useCount)
      const _multiplicator = _priceMultiplicator.pow(_useCount)
      const _amount = _startPrice.mul(_multiplicator)

      return String(_amount)
    },
    async __getZLPAllowances(address) {
      const zilPay = await this.__getZilPay()
      const field = 'allowances'
      const owner = String(zilPay.wallet.defaultAccount.base16).toLowerCase()

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__ZLP, field, [owner, address])

      if (!result || !result[field] || !result[field][owner] || !result[field][owner][address]) {
        return '0'
      }

      return result[field][owner][address]
    },
    async __increaseAllowance(address) {
      const zilPay = await this.__getZilPay()
      const { contracts, utils } = zilPay
      const contract = contracts.at(this.__ZLP)
      const amount = utils.units.toQa('0', utils.units.Units.Zil)
      const gasPrice = utils.units.toQa('2000', utils.units.Units.Li)
      const isNet = await this.__net()
      const balance = await this.__getZLPBalance()

      if (!isNet) {
        return false
      }

      return await contract.call(
        'IncreaseAllowance',
        [
          {
            vname: 'spender',
            type: 'ByStr20',
            value: address
          },
          {
            vname: 'amount',
            type: 'Uint128',
            value: String(balance)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
        }
      )
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

      if (!result || !result[field]) {
        return []
      }


      let list = result[field]
      list = Object.keys(list).map((id) => ({
        id,
        price: list[id].arguments[0],
        owner: list[id].arguments[1],
      }))
      return list
    },
    async __getBreedPrice(tokenID) {
      const zilPay = await this.__getZilPay()
      const field = 'waiting_list'

      await this.__connect()
      const isNet = await this.__net()

      if (!isNet) {
        return false
      }

      const { result } = await zilPay
        .blockchain
        .getSmartContractSubState(this.__BreedPlace, field, [String(tokenID)])

      if (!result || !result[field] || !result[field][String(tokenID)]) {
        return '0'
      }

      return result[field][String(tokenID)].arguments[0]
    },
    async __cancelBreed(tokenId) {
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
        'Cancel',
        [
          {
            vname: 'token_id',
            type: 'Uint256',
            value: String(tokenId)
          }
        ],
        {
          amount,
          gasPrice,
          gasLimit: utils.Long.fromNumber(5000)
        }
      )
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
        'Add',
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

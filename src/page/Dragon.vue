<template>
  <div class="dragon-page">
    <div
      v-show="showoner == 'You'"
      class="top-panel"
    >
      <button
        v-show="stage === 0"
        class="nav_btn w-button top-btn"
        @click="__nextStage(tokenId)"
      >
        hatch egg
      </button>
      <button
        class="nav_btn w-button top-btn danger-btn"
        @click="__burn(tokenId)"
      >
        suicide
      </button>
      <button
        class="nav_btn w-button top-btn"
        @click="transferModal"
      >
        transfer
      </button>
      <button
        class="nav_btn w-button top-btn credits__btn"
        :disabled="stage < 1"
        @click="showFightModal"
      >
        To Arena
      </button>
      <button
        v-if="isApprovalMarket"
        class="nav_btn w-button top-btn"
        @click="sellDragon"
      >
        Sell
      </button>
      <button
        v-if="!isApprovalMarket"
        class="nav_btn w-button top-btn"
        @click="setApprove(tokenId)"
      >
        Unlock for sale
      </button>
      <button
        class="nav_btn w-button top-btn breed-btn"
        :disabled="stage < 1"
        @click="addToBreed"
      >
        Breed <svg
          width="20"
          height="20"
          viewBox="0 0 512 456"
          class="breed-icon">
          <path d="M256 455.516C248.711 455.516 241.684 452.875 236.207 448.078C215.523 429.992 195.582 412.996 177.988 398.004L177.898 397.926C126.316 353.969 81.7734 316.008 50.7812 278.613C16.1367 236.809 0 197.172 0 153.871C0 111.801 14.4258 72.9883 40.6172 44.5781C67.1211 15.832 103.488 0 143.031 0C172.586 0 199.652 9.34375 223.477 27.7695C235.5 37.0703 246.398 48.4531 256 61.7305C265.605 48.4531 276.5 37.0703 288.527 27.7695C312.352 9.34375 339.418 0 368.973 0C408.512 0 444.883 15.832 471.387 44.5781C497.578 72.9883 512 111.801 512 153.871C512 197.172 495.867 236.809 461.223 278.609C430.23 316.008 385.691 353.965 334.117 397.918C316.492 412.934 296.52 429.957 275.789 448.086C270.316 452.875 263.285 455.516 256 455.516V455.516ZM143.031 29.9922C111.965 29.9922 83.4258 42.3906 62.6641 64.9062C41.5938 87.7617 29.9883 119.355 29.9883 153.871C29.9883 190.289 43.5234 222.859 73.8711 259.477C103.203 294.871 146.832 332.051 197.348 375.102L197.441 375.18C215.102 390.23 235.121 407.293 255.957 425.512C276.918 407.258 296.969 390.168 314.664 375.094C365.176 332.043 408.801 294.871 438.133 259.477C468.477 222.859 482.012 190.289 482.012 153.871C482.012 119.355 470.406 87.7617 449.336 64.9062C428.578 42.3906 400.035 29.9922 368.973 29.9922C346.215 29.9922 325.32 37.2266 306.871 51.4922C290.43 64.2109 278.977 80.2891 272.262 91.5391C268.809 97.3242 262.73 100.777 256 100.777C249.27 100.777 243.191 97.3242 239.738 91.5391C233.027 80.2891 221.574 64.2109 205.129 51.4922C186.68 37.2266 165.785 29.9922 143.031 29.9922V29.9922Z"/>
        </svg>
      </button>
      <router-link
        v-show="stage >= 1"
        class="nav_btn w-button top-btn Dragon__gens"
        :to="{ name: 'GenLab', params: { id: tokenId } }"
      >
        GenLab
      </router-link>
    </div>
    <div class="token-des">
      <p>
        <a
          :href="`https://viewblock.io/zilliqa/address/${tokenOwner}`"
          target="_blank"
          class="nav_link owner-link"
        >
          Owner: <span>{{ showoner }}</span>
        </a>
      </p>
      <p>
        Rarity: <span :style="{ color: rarity.color }">{{ rarity.name }}</span>
      </p>
      <p>
        DragonID: <span>#{{ tokenId }}</span>
      </p>
    </div>
    <div class="dragon container-dragon">
      <Card
        :id="tokenId"
        :showID="false"
      />
      <div class="radar">
        <canvas
          id="combat"
          :width="width"
          height="410"
        />
      </div>
    </div>
    <div class="dragon-page-table">
      <RareTable
        v-if="rarity"
        :values="rarity.values"
      />
    </div>
  </div>
  <Modal
    title="Transfer"
    name="transfer"
  >
    <div class="transfer-modal">
      <h2 class="dis">
        Send #{{ tokenId }}.
      </h2>
      <label class="recipient">
        <input
          v-model="recipientAddress"
          type="text"
          placeholder="Address of the recipient"
        >
      </label>
      <button
        class="nav_btn w-button top-btn danger-btn"
        :disabled="!isValidAddress"
        @click="toTransfer"
      >
        Transfer
      </button>
    </div>
  </Modal>
  <Modal
    title="NFT Trade(ZIL)"
    name="sell"
  >
    <div class="transfer-modal">
      <h2 class="dis">
        Sell {{ stage > 0 ? 'dragon' : 'egg' }} #{{ tokenId }}.
      </h2>
      <label class="breed-amount">
        <input
          v-model="sellAmount"
          type="number"
          min="0"
          class="breed-btn"
          placeholder="Sell amount in ZIL"
        >
      </label>
      <button
        class="nav_btn w-button top-btn"
        :disabled="Number(sellAmount) <= 0"
        @click="toSellDragon"
      >
        Sell
      </button>
    </div>
  </Modal>
  <Modal
    title="Breed"
    name="breed"
  >
    <div class="breed-modal">
      <div class="breed-wrapper">
        <img
          src="/img/hearts.svg"
          alt="hearts"
          height="100"
          width="100"
        >
        <p class="breed-des">
          You can expose your dragon for selling love for <span>ZLP</span>
        </p>
      </div>
      <label class="breed-amount">
        <input
          v-model="breadAmount"
          type="number"
          placeholder="Amount ZLP"
          class="breed-btn"
          :min="minZLPForBreed"
        />
      </label>
      <button
        class="nav_btn w-button top-btn breed-btn"
        @click="toBread"
      >
        Place dragon
      </button>
    </div>
  </Modal>
    <Modal
    title="Add to fight place"
    name="fight"
  >
    <div class="breed-modal">
      <div class="breed-wrapper">
        <img
          src="/img/fight.svg"
          alt="fight"
          height="100"
          width="100"
        >
        <p class="breed-des">
          you can win <span>ZLP</span> by putting your dragon in fights!
        </p>
      </div>
      <label class="fight-amount">
        <input
          v-model="fightPrice"
          type="number"
          placeholder="Amount ZLP"
          class="fight-btn"
          :min="minFightPrice"
        />
      </label>
      <button
        class="nav_btn w-button top-btn fight-btn"
        @click="placeToWaitList"
      >
        Place for battle
      </button>
    </div>
  </Modal>
  <Loader v-if="loader">
    Confirmation...
  </Loader>
</template>

<script>
import BN from 'bn.js'
import MicroModal from 'micromodal'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Loader from '@/components/Loader'
import RareTable from '@/components/RareTable'

import { WalletStore } from '@/store/wallet'
import ZilPayMixin from '@/mixins/zilpay'
import RadarMixin from '@/mixins/radar'
import UtilsMixin from '@/mixins/utils'

let width = 450

if (window.innerWidth <= 650) {
  width = 250
}
export default {
  name: 'Dragon',
  mixins: [RadarMixin, ZilPayMixin, UtilsMixin],
  components: {
    Card,
    RareTable,
    Modal,
    Loader
  },
  data() {
    return {
      width: width,
      stage: null,
      rarity: {
        color: '',
        name: '',
        values: null
      },
      values: [],
      loader: false,
      recipientAddress: '',
      sellAmount: null,
      owner: null,
      showoner: null,
      tokenOwner: null,
      id: null,
      minZLPForBreed: 0,
      minFightPrice: 200,
      fightPrice: 200,
      breadAmount: 0,
      radarChartData: {
        labels: [],
        datasets: []
      },
      approvals: []
    }
  },
  computed: {
    tokenId() {
      return this.$route.params.id
    },
    isApprovalMarket() {
      return this.approvals.includes(this.__MarketPlace)
    },
    isValidAddress() {
      if (!this.recipientAddress) {
        return false
      }

      const { isBech32 } = window.zilPay.utils.validation

      return isBech32(this.recipientAddress)
    }
  },
  methods: {
    paintChart() {
      let ctx = window.document.getElementById('combat')

      if (!ctx) {
        return null
      }

      let label = 'Combat gens'
      let dataSet = this.__parseGens(
        this.tokenId, this.values, label,
        '#7568B0', '#f261ee'
      );
      let options = {
        legend: {
          display: true
        },
        scale:{
          pointLabels:{
            fontColor:"#d528d0",
          }
        },
        layout: {
        }
      }
      this.radarChartData.datasets[0] = dataSet
      this.__generateCharts(ctx, options)
    },
    async placeToWaitList() {
      const _amount = new BN(String(this.fightPrice))
      const _decimal = new BN('1000000000000000000')
      const _value = _amount.mul(_decimal)

      await this.__placeToWaitList(this.tokenId, String(_value))

      document.querySelectorAll('#fight')[0].classList.remove('is-open')
    },
    async addToBreed() {
      const minPriceQA = await this.__getMinBreedPrice()
      const minAmount = Number(minPriceQA) / (10 ** 18)

      this.minZLPForBreed = minAmount
      this.breadAmount = minAmount

      MicroModal.show('breed')
    },
    async setApprove(tokenId) {
      this.loader = true
      try {
        const tx = await this.__setApprove(this.__MarketPlace, tokenId)
        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then(() => {
              this.loader = false
              clearInterval(inter)
              this
                .__getTokenApprovals(this.tokenId)
                .then((approvals) => {
                  if (approvals) {
                    this.approvals.push(approvals)
                  }
                }).catch(() => null);
            })
            .catch(() => null)
        }, 10000)
      } catch {
        this.loader = false
      }
    },
    showFightModal() {
      MicroModal.show('fight')
    },
    transferModal() {
      MicroModal.show('transfer')
    },
    sellDragon() {
      MicroModal.show('sell')
    },
    async toSellDragon() {
      const _breedAmount = new BN(String(this.sellAmount))
      const _decimal = new BN('1000000000000')
      const _amount = _breedAmount.mul(_decimal)

      await this.__sendToMarketPlace(this.tokenId, _amount);

      document.querySelectorAll('#sell')[0].classList.remove('is-open')
    },
    async toBread() {
      const _breedAmount = new BN(String(this.breadAmount))
      const _decimal = new BN('1000000000000000000')
      const _amount = _breedAmount.mul(_decimal)

      await this.__addToBreedPlace(String(_amount), this.tokenId)

      document.querySelectorAll('#breed')[0].classList.remove('is-open')
    },
    async toTransfer() {
      const { fromBech32Address } = window.zilPay.crypto
      const address = fromBech32Address(this.recipientAddress)

      await this.__transfer(address, this.tokenId)

      document.querySelectorAll('#transfer')[0].classList.remove('is-open')
    },
    checkOwner() {
      const { base16 } = window.zilPay.wallet.defaultAccount
      const { toBech32Address } = window.zilPay.crypto

      if (!this.owner) {
        return null
      }

      if (String(base16).toLowerCase() === String(this.owner).toLowerCase()) {
        this.showoner = 'You'

        return null
      }

      const bech32 = toBech32Address(this.owner)

      this.showoner = this.__trim(bech32)
      this.tokenOwner = bech32
    }
  },
  updated() {
    if (this.id !== this.tokenId) {
      this
        .__getCombatGen(this.tokenId)
        .then((gens) => {
          this.values = this.__genParse(gens)

          this.paintChart()
          this.id = this.tokenId

          return this.__getTokenOwner(this.tokenId)
        })
        .then((owner) => {
          this.owner = owner
          this.checkOwner()
        })
    }
  },
  mounted() {
    this.id = this.tokenId

    WalletStore.watch((address) => {
      if (address) {
        this.checkOwner()
      }
    })

    this
      .__getTokenApprovals(this.tokenId)
      .then((approvals) => {
        if (approvals) {
          this.approvals.push(approvals)
        }
      }).catch(() => null);
    this
      .__getVisualGen(this.tokenId)
      .then((gens) => {
        this.rarity = this.__getRarity(gens)
        document.querySelector('div.Card > div').style.boxShadow = `0 0 40px ${this.rarity.color}`;
        console.log(this.rarity)
      })
      .catch((err) => console.error(err))
    this
      .__getTokensIds()
      .then((tokens) => {
        this.stage = Number(tokens[this.tokenId])

        return this.__getCombatGen(this.tokenId)
      })
      .catch(() => this.__getCombatGen(this.tokenId))
      .then((gens) => {
        this.values= this.__genParse(gens)

        this.paintChart()

        return this.__getTokenOwner(this.tokenId)
      })
      .then((owner) => {
        this.owner = owner
        this.checkOwner()
      })
  }
}
</script>

<style>
.breed-des {
  font-family: 'Open Sans',sans-serif;
  line-height: 19px;
  color: #8973d7;
  font-size: 15px;
  max-width: 220px;
  text-align: center;
}
.owner-link {
  padding: 0;
}
.breed-des > span {
  color: #d528d0;
  font-weight: bold;
}
.dragon-page-table {
  max-width: 300px;
  width: 100%;
}
.container-dragon {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
}
.token-des {
  text-align: left;
  max-width: 700px;
  width: 100%;
  margin-top: 50px;
}
.token-des > p {
  font-family: 'Open Sans',sans-serif;
  color: #fff;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
}
.dragon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
}
.top-btn {
  text-transform: uppercase;
}
.danger-btn {
  color: #dc3545;
  border-color: #dc3545;
}
.danger-btn:hover {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
  box-shadow: 0 16px 23px -13px #dc3545;
}
.top-panel {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  margin-top: 150px;
  width: 100%;
  max-width: 900px;
}
.dragon > .Card > .Card-content {
  width: 400px;
  height: 400px;
}
.breed-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.radar, .dragon > .Card {
  margin: 10px;
}
.recipient, .dis {
  color: #8973d7;
}
.breed-icon {
  padding-left: 5px;
}
.breed-icon > path {
  fill: #d528d0;
}
.breed-btn, .fight-btn {
  display: flex;
  align-items: center;

  color: #d528d0;
  border-color: rgb(213, 40, 208, .6);
}
.breed-btn:hover .breed-icon > path {
  fill: #fff;
}
.fight-btn {
  color: #7F3BD6;
  border-color: rgb(127, 59, 214, .6);
}
.fight-btn:hover {
  border-color: #7F3BD6;
  background-color: #7F3BD6;
  box-shadow: 0 16px 23px -13px rgb(213, 40, 208, .6);
  color: #fff;
}
.breed-btn:hover {
  border-color: #d528d0;
  background-color: #d528d0;
  box-shadow: 0 16px 23px -13px rgb(213, 40, 208, .6);
  color: #fff;
}
.Dragon__gens {
  border-color: rgb(32, 201, 151);
  background-color: transparent;
  color: rgb(32, 201, 151);
  background-position: 0 -85px;
  padding-left: 44px;
  background-image: url(/img/icons.svg);
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  height: 40px;
}
.Dragon__gens:hover {
  border-color: rgb(32, 201, 151);
  background-color: rgb(32, 201, 151);
  box-shadow: 0 16px 23px -13px rgb(32, 201, 151);
  color: #fff;
}
.breed-amount > input, .fight-amount > input {
  padding: 10px 19px;
  align-self: center;
  border-style: solid;
  border-width: 1px;
  border-color: #d528d0;
  background-color: transparent;
  font-family: 'Open Sans',sans-serif;
  line-height: 19px;
  text-align: center;
  width: 100%;
}
.fight-amount > input {
  border-color: #7F3BD6;
  color: #7F3BD6;
}
.breed-amount > input:hover {
  background-color: transparent;
  color: #d528d0;
}
.breed-amount > input:focus {
  outline: -webkit-focus-ring-color auto 0px;
}
.recipient > input{
  padding: 10px 19px;
  align-self: center;
  border-style: solid;
  border-width: 1px;
  border-color: #dc3545;
  background-color: transparent;
  font-family: 'Open Sans',sans-serif;
  line-height: 19px;
  text-align: center;
  width: 100%;
}
.recipient > *::-webkit-input-placeholder {
  color: #dc3545;
  opacity: 0.6;
}

button[disabled] {
  opacity: 0.6;
}

@media (max-width: 650px) {
  .dragon > .Card > .Card-content {
    width: 250px;
    height: 250px;

    margin-top: 100px;
  }

  .token-des {
    text-align: center;
  }
}
</style>

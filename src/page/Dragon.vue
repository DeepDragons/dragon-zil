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
        class="nav_btn w-button top-btn"
        @click="placeToWaitList"
      >
        fight
      </button>
    </div>
    <div class="token-des">
      <p>
        Owner: <span>{{ showoner }}</span>
      </p>
      <p>
        DragonID: <span>#{{ tokenId }}</span>
      </p>
    </div>
    <div class="dragon container-dragon">
      <Card
        :stage="stage"
        :id="tokenId"
      />
      <div class="radar">
        <canvas
          id="combat"
          :width="width"
          height="410"
        />
      </div>
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
</template>

<script>
import MicroModal from 'micromodal'
import Card from '@/components/Card'
import Modal from '@/components/Modal'

import { WalletStore } from '@/store/wallet'
import ZilPayMixin from '@/mixins/zilpay'
import RadarMixin from '@/mixins/radar'

let width = 450

if (window.innerWidth <= 650) {
  width = 250
}
export default {
  name: 'Dragon',
  mixins: [RadarMixin, ZilPayMixin],
  components: {
    Card,
    Modal
  },
  data() {
    return {
      width: width,
      values: [],
      recipientAddress: '',
      owner: null,
      showoner: null,
      id: null,
      radarChartData: {
        labels: [],
        datasets: []
      }
    }
  },
  computed: {
    tokenId() {
      return this.$route.params.id
    },
    stage() {
      return Number(this.$route.params.stage)
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
    placeToWaitList() {
      this.__placeToWaitList(this.tokenId)
    },
    transferModal() {
      MicroModal.show('transfer')
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

      this.showoner = this.__trim(toBech32Address(this.owner))
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
      .__getTokensIds()
      .then((tokens) => {
        const curernt_stage = Number(tokens[this.tokenId])

        if (curernt_stage !== Number(this.stage) && isNaN(Number(this.stage))) {
          this.$router.push({
            name: 'Dragon',
            params: {
              id: this.tokenId,
              stage: curernt_stage
            }
          })
        }

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
.container-dragon {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
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

  box-shadow: 0 0 40px #d528d0;
}
.radar, .dragon > .Card {
  margin: 10px;
}
.recipient, .dis {
  color: #8973d7;
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
}
</style>

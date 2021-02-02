<template>
  <div class="breed-page">
    <div class="fights-wrapper">
      <Card
        :stage="1"
        :id="tokenId"
      />
      <div
        v-show="selected"
        class="b-menu__item"
      >
        <span
          class="b-menu__item-icon"
          @click="onFight"
        />
      </div>
      <Card
        flip
        :stage="1"
        :id="selected"
        @click="trySelectDragon"
      />
    </div>
    <div class="buttleradar-001">
      <canvas
        id="combatRadar"
        :width="width"
        height="410"
      />
    </div>
  </div>
  <Modal
    title="Your dragons"
    name="your-dragons"
  >
    <div class="mydragons-wrapper">
      <Card
        v-for="(dragon, index) of myDragons"
        class="dragon-card"
        :key="index"
        :stage="1"
        :id="dragon"
        @click="onSelectedDragon(dragon)"
      />
    </div>
  </Modal>
  <Modal
    title="Transaction error"
    name="tx-error"
  />
  <Modal
    title="Winner"
    name="dragon-winner"
  >
    <div class="mydragons-wrapper">
      <router-link :to="{ name: 'Dragon', params: { id: winnerID, stage: 1 } }">
        <Card
          class="dragon-card"
          :stage="1"
          :id="winnerID"
        />
      </router-link>
    </div>
  </Modal>
  <Loader v-if="loader">
    Confirmation...
  </Loader>
</template>

<script>
import MicroModal from 'micromodal'
import Card from '@/components/Card'
import Modal from '@/components/Modal'
import Loader from '@/components/Loader'

import ZilPayMixin from '@/mixins/zilpay'
import RadarMixin from '@/mixins/radar'

export default {
  name: 'Breed',
  mixins: [RadarMixin, ZilPayMixin],
  components: {
    Card,
    Loader,
    Modal
  },
  data() {
    return {
      selected: null,
      myDragons: [],
      loader: false,
      error: null,
      radarChartData: {
        labels: [],
        datasets: []
      }
    }
  },
  computed: {
    tokenId() {
      return this.$route.params.id
    }
  },
  methods: {
    enemyGens(opponentGens) {
      const  label = 'Enemy'
      const dataSet = this.__parseGens(
        this.tokenId,
        this.__genParse(opponentGens),
        label,
        'rgba(255, 0, 85, 0.877)',
        'rgba(255, 0, 85, 0.877)'
      );
      this.radarChartData.datasets = [dataSet];
    },
    myGens(gens) {
      const  label = 'You'
      const dataSet = this.__parseGens(
        this.selected,
        this.__genParse(gens),
        label,
        '#7568B0',
        '#7568B0'
      );

      this.radarChartData.datasets.push(dataSet);
    },
    printChart() {
      let ctx = window.document.getElementById('combatRadar')
      const options = {
        legend: {
          display: true
        },
        scale:{
          pointLabels:{
            fontColor: "#d528d0"
          }
        },
        layout: {
        }
      }
      this.__generateCharts(ctx, options)
    },
    trySelectDragon() {
      MicroModal.show('your-dragons')
    },
    async loadTokens() {
      const tokens = await this.__getTokensIds()

      this.myDragons = Object
        .keys(tokens)
        .filter((t) => Number(tokens[t]) > 0 && t !== this.tokenId)
    },
    async onSelectedDragon(id) {
      this.selected = id
      const node =document.querySelector('#your-dragons')
      const classnmae = node.className
      node.className = classnmae.replace('is-open', '')

      const enemyGens = await this.__getCombatGen(this.tokenId)
      const myGens = await this.__getCombatGen(id)

      this.enemyGens(enemyGens)
      this.myGens(myGens)
      this.printChart()
    },
    async onFight() {
      this.loader = true
      const id0 = this.tokenId
      const id1 = this.selected

      try {
        const tx = await this.__fightStart(id0, id1)

        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              const { receipt } = tx

              if (receipt && receipt.exceptions) {
                this.error = 'Error threw transactions'
                MicroModal.show('tx-error')
              }

              if (receipt && receipt.event_logs) {
                const event = 'FightsResultsWinLose'
                const foundEvent = receipt.event_logs.find((e) => e._eventname === event)
                const foundWinner = foundEvent.params.find((p) => p.vname === 'token_id_winner')
                this.winnerID = foundWinner.value
                MicroModal.show('dragon-winner')
              }

              this.loader = false
              clearInterval(inter)
            })
            .catch(() => null)
        }, 10000)
      } catch {
        this.loader = false
      }
    }
  },
  mounted() {
    this.loadTokens()
  }
}
</script>

<style>
.breed-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.buttleradar-001 {
  width: 100%;
  margin-bottom: 200px;
  max-width: 450px;
  max-height: 450px;
}
.fights-wrapper {
  padding: 100px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1200px;
}
.dragon-card {
  padding: 30px;
}
@media only screen and (max-width: 1000px) {
  .fights-wrapper {
    padding-top: 200px;
  }
}
</style>

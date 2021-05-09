<template>
  <div class="fight-page">
    <div class="fights-wrapper">
      <Card :id="tokenId" />
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
        :id="selected"
        :showID="Boolean(selected)"
        @click="trySelectDragon"
      />
    </div>
    <p class="fight-description">
      Winner will get <span>{{ fightPrice }} ZLP</span>
    </p>
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
    <div class="fight-result-wrapper">
      <router-link :to="{ name: 'Dragon', params: { id: winnerID, stage: 1 } }">
        <Card
          class="dragon-card"
          :id="winnerID"
        />
      </router-link>
      <h2
        v-show="selected === winnerID"
        class="breed-des result-text"
      >
        You win
      </h2>
      <h2
        v-show="selected === tokenId"
        class="breed-des result-text"
      >
        You lose
      </h2>
    </div>
  </Modal>
  <Loader v-if="loader">
    <a
      :href="'https://viewblock.io/zilliqa/tx/' + hash"
      target="_blank"
      class="nav_link w-nav-link"
    >
      Confirming TX
    </a>
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
  name: 'Fight',
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
      hash: null,
      error: null,
      winnerID: null,
      fightPrice: 0,
      allowances: 0,
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
    async getAllowances() {
      const _allowances = await this.__getZLPAllowances(this.__FightPlace)
      this.allowances = Number(_allowances) / 10**18

      return this.allowances
    },
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
      const fightPrice = await this.__getDragonForFight(this.tokenId)
      this.fightPrice = (Number(fightPrice) / 1000000000000000000) * 2
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
        await this.getAllowances()

        if (this.allowances < this.fightPrice) {
          await this.__increaseAllowance(this.__FightPlace)
        }
        const tx = await this.__fightStart(id0, id1)

        this.hash = tx.TranID

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
                const event = 'AfterFightWinLose'
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
      } catch (err) {
        this.error = err.message
        MicroModal.show('tx-error')
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
.fight-page {
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

.b-menu__item-icon:hover {
  transform: scale(1.2);
}
.fight-description {
  color: #7F3BD6;
  font-size: 22px;
  line-height: 65px;
}
.fight-description > span {
  color: #d0ab2f;
}
.fight-result-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.b-menu__item-icon {
    cursor: pointer;
  transition: all 0.1s ease-out;
    display: inline-block;
    position: relative;
    width: 100px;
    height: 100px;
    border: 1px solid #6f42c1;
    border-radius: 50%;
    box-shadow: none;
    transition: all .3s ease;
}
.b-menu__item-icon::before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 88px;
    height: 88px;
    border: 5px solid #dc3545;
    border-radius: 50%;
    transition: .3s ease;
}
.b-menu__item-icon::after {
    content: '';
    display: block;
    position: absolute;
    left: 5px;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    transition: .3s ease;
    background-image: url('/img/battle.png');
    background-repeat: no-repeat;
    background-position: center center;
}
.result-text {
  text-align: center;
  width: 100%;
  font-size: 32px;
}
@media only screen and (max-width: 1000px) {
  .fights-wrapper {
    padding-top: 200px;
  }
}
</style>

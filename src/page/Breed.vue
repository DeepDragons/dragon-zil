<template>
  <div class="breed-page">
    <div class="fights-wrapper">
      <Card :id="tokenId" />
      <img
        v-show="selected"
        class="heart-button"
        src="/img/heart.svg"
        @click="onBreed"
      >
      <Card
        flip
        :id="selected"
        :showID="Boolean(selected)"
        @click="trySelectDragon"
      />
    </div>
    <div class="buttleradar-001">
      <canvas
        id="combatRadar"
        :width="320"
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
      allowances: 0,
      breedPrice: 250000,
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
      const  label = 'Lover'
      const dataSet = this.__parseGens(
        this.tokenId,
        this.__genParse(opponentGens),
        label,
        'rgb(148 0 255 / 88%)',
        'rgb(148 0 255 / 88%)'
      );
      this.radarChartData.datasets = [dataSet];
    },
    async getAllowances() {
      const _allowances = await this.__getZLPAllowances(this.__BreedPlace)
      this.allowances = Number(_allowances) / 10**18

      return this.allowances
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
      const breedPrice = await this.__getBreedPrice(this.tokenId)
      const tokens = await this.__getTokensIds()

      this.breedPrice = (Number(breedPrice) / 1000000000000000000)

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
    async onBreed() {
      this.loader = true
      const id0 = this.tokenId
      const id1 = this.selected

      try {
        await this.getAllowances()
        if (this.allowances < this.breedPrice) {
          await this.__increaseAllowance(this.__BreedPlace)
        }
        const tx = await this.__breedStart(id1, id0)

        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              try {
                if (tx.eventLogs && tx.eventLogs.length === 4) {
                  const found = tx.eventLogs.find((e) => e._eventname === 'BirthSuccess')
                  const tokenID = found.params[2].value

                  this.$router.push({
                    name: 'Dragon',
                    params: {
                      id: tokenID,
                      stage: 0
                    }
                  })
                }
              } catch {
                //
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
.heart-button {
  cursor: pointer;
  width: 150px;
  height: 150px;
  transition: all 0.2s ease-out;
}
.heart-button:hover {
  width: 190px;
  height: 190px;
}
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

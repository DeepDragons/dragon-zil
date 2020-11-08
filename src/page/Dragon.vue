<template>
  <NavBar />
  <div class="dragon-page">
    <div class="top-panel">
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
      <button class="nav_btn w-button top-btn">
        transfer
      </button>
      <button
        class="nav_btn w-button top-btn"
        disabled
      >
        fight
      </button>
    </div>
    <div class="dragon container">
      <Card
        :stage="stage"
        :id="tokenId"
      />
      <div class="radar">
        <canvas
          id="combat"
          :width="width"
          height="450"
        />
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Card from '@/components/Card'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

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
    NavBar,
    Footer
  },
  data() {
    return {
      width: width,
      values: []
    }
  },
  computed: {
    tokenId() {
      return this.$route.params.id
    },
    stage() {
      return Number(this.$route.params.stage)
    }
  },
  methods: {
    paintChart() {
      let ctx = window.document.getElementById('combat')
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
    }
  },
  mounted() {
    this
      .__getCombatGen(this.tokenId)
      .then((gens) => {
        this.values= this.__genParse(gens)

        this.paintChart()
      })
  }
}
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}
.dragon-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top-btn {
  text-transform: uppercase;
}
.danger-btn {
  color: #dc3545;
  border-color: #dc3545;
}
.top-panel {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;

  margin-top: 100px;
  width: 100%;
  max-width: 900px;
}
.dragon > .Card > .Card-content {
  width: 400px;
  height: 400px;

  box-shadow: 0 0 40px #d528d0;
}
.radar {
  margin: 50px;
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

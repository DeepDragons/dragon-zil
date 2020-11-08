<template>
  <NavBar />
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
  align-items: center;
  margin-top: 40px;
  width: 100%;
  height: 100%;
  min-height: 100vh;

  padding-top: 10%;
}
.dragon > .Card > .Card-content {
  width: 400px;
  height: 400px;

  box-shadow: 0 0 40px #d528d0;
}
.radar {
  margin: 100px;
}

@media (max-width: 650px) {
  .dragon > .Card > .Card-content {
    width: 250px;
    height: 250px;

    margin-top: 100px;
  }
}
</style>

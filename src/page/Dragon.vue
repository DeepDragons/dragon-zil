<template>
  <NavBar />
  <div class="dragon container">
    <Card
      :stage="0"
      :id="tokenId"
    />
    <div>
      <canvas
        id="combat"
        width="800"
        height="400"
      />
    </div>
  </div>
  <Footer />
</template>

<script>
import { useRoute } from 'vue-router'

import Card from '@/components/Card'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

import ZilPayMixin from '@/mixins/zilpay'
import RadarMixin from '@/mixins/radar'

export default {
  name: 'Dragon',
  mixins: [RadarMixin, ZilPayMixin],
  components: {
    Card,
    NavBar,
    Footer
  },
  setup() {
    const route = useRoute()

    return {
      tokenId: route.params.id
    }
  },
  methods: {
    paintChart(values) {
      let ctx = window.document.getElementById('combat')
      let label = 'Combat gens'
      let dataSet = this.__parseGens(
        this.id, values, label,
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
        const parsed = this.__genParse(gens)

        this.paintChart(parsed)
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
}
.dragon > .Card > .Card-content {
  width: 400px;
  height: 400px;

  box-shadow: 0 0 40px #d528d0;
}
</style>

import Chart from 'chart.js'

var defaultOptions = {
  legend: {
    display: true
  },
  scale:{
    pointLabels:{
       fontColor:"#d528d0",
    }
  }
}

export default {
  data() {
    return {
      attacName: 'A',
      defName: 'D'
    }
  },
  computed: {
    __combatGensLabels() {
      let amountAttackGens = 16
      let amountAllGens = 32
      let array = []

      for (let index = 0; index < amountAllGens; index++) {
        if (index <= amountAttackGens) {
          array.push(`${this.attacName} ${index}`)
        } else {
          array.push(`${this.defName} ${index}`)
        }
      }

      return array
    }
  },
  mounted() {
    this.radarChartData.labels = this.__combatGensLabels
  },
  methods: {
    __generateCharts(ctx, options=defaultOptions) {
      let combatChart = new Chart(ctx, {
        type: 'radar',
        data: this.radarChartData,
        options
      })

      return combatChart
    },
    __parseGens(id, gensArray, label, borderColor,
      pointHoverBackgroundColor, borderWidth=2) {
      let dataset = {
        label: `${label} #${id}`,
        borderColor: borderColor,
        pointHoverBackgroundColor: pointHoverBackgroundColor,
        data: gensArray,
        borderWidth: borderWidth
      }

      return dataset
    },
    __genParse(_genNumber) {
      let gens = String(_genNumber).split(/(..)/g);
      gens = gens.filter(el => !isNaN(el) && el !== '').map(el => Number(el));

      return gens.reverse();
    }
  }
}

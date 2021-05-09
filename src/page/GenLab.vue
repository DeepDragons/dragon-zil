<template>
  <div class="GenLab">
    <div class="GenLab__wrapper">
      <Card :id="tokenId" />
      <div>
        <div class="detail_wrap">
          <div class="detail_wings wings_01"></div>
          <h3 class="heading_03">Upgrade</h3>
        </div>
      </div>
      <img
        class="GenLab__bottle"
        src="/img/bottle.png"
      >
    </div>
    <div class="GenLab__info">
      <div class="">
        <div class="rm_feature rm_f_lab green">
          Gen Price: {{ genPrice }} <span class="symbol">ZLP</span>
        </div>
      </div>
    </div>
    <button
      class="nav_btn w-button top-btn GenLab__btn"
      @click="showModal"
    >
      Upgrade
    </button>
    <div v-if="values" class="GenLab__table">
      <table class="table">
        <tbody>
          <tr class="header">
            <th
              v-for="(_, index) of Array(10)"
              :key="index"
            >
              Def
            </th>
          </tr>
          <tr class="values">
            <td
              v-for="(el, index) of values.slice(1, 11)"
              :key="index"
              @click="upgrade(index)"
            >
              {{ el }}
            </td>
          </tr>
        </tbody>
      </table>
      <table
        class="table"
        style="margin-top: 30px;"
      >
        <tbody>
          <tr class="header">
            <th
              v-for="(_, index) of Array(10)"
              :key="index"
            >
              Atack
            </th>
          </tr>
          <tr class="values">
            <td
              v-for="(el, index) of values.slice(11, 21)"
              :key="index"
              @click="upgrade(10 + index)"
            >
              {{ el }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="GenLab__radar">
      <canvas
        id="GenLab_gens"
      />
    </div>
  </div>
  <Modal
    title="Upgrade gen"
    name="genlab-upgrade"
  >
    <div class="GenLab__upgrade-form">
      <h4 class="dis">
        Upgrade gens for #{{ tokenId }}.
      </h4>
      <label class="gen-number">
        <input
          v-model="genNumber"
          type="number"
          max="20"
          min="1"
          placeholder="Select gen number"
        >
      </label>
      <button
        v-show="Number(allowances) >= Number(genPrice)"
        class="nav_btn w-button top-btn GenLab__btn"
        @click="changeGen"
      >
        Upgrade
      </button>
      <button
        v-show="Number(allowances) < Number(genPrice)"
        class="nav_btn w-button top-btn GenLab__btn"
        @click="unlockZLP"
      >
        Unlock
      </button>
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
  name: 'GenLab',
  mixins: [ZilPayMixin, RadarMixin],
  components: {
    Card,
    Loader,
    Modal
  },
  data() {
    return {
      loader: false,
      values: [],
      genNumber: null,
      genPrice: 0,
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
    async updateGens() {
      const gens = await this.__getCombatGen(this.tokenId)
      this.values = this.__genParse(gens)
      this.paintChart()
    },
    async updateAllowances() {
      const _allowances = await this.__getZLPAllowances(this.__GenLab)
      console.log(_allowances)
      this.allowances = Number(_allowances) / 10**18
    },
    paintChart() {
      let ctx = window.document.getElementById('GenLab_gens')

      if (!ctx) {
        return null
      }

      let label = 'Combat gens'
      let dataSet = this.__parseGens(
        this.tokenId, this.values.slice(1), label,
        '#20c997', '#20c997'
      );
      let options = {
        legend: {
          display: true
        },
        scale:{
          pointLabels:{
            fontColor: "#20c997",
          }
        },
        layout: {
        }
      }
      this.radarChartData.datasets[0] = dataSet
      const chartRadar = this.__generateCharts(ctx, options)

      ctx.onclick = evt => {
        let activePoints = chartRadar.getElementsAtEvent(evt);

        if (activePoints[0]) {
          const idx = activePoints[0]['_index'];

          this.upgrade(idx)
        }
      }
    },
    async getPrice() {
      const price = await this.__getGenPrice(this.tokenId)

      this.genPrice = price / 10**18
    },
    showModal() {
      MicroModal.show('genlab-upgrade')
    },
    async unlockZLP() {
      this.loader = true

      try {
        const tx = await this.__increaseAllowance(this.__GenLab)
        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              const { receipt } = tx

              if (receipt && receipt.exceptions) {
                MicroModal.show('tx-error')
              }

              this.updateAllowances()

              this.loader = false
              clearInterval(inter)
            })
            .catch(() => null)
        }, 5000)
      } catch {
        this.loader = false
      }
      this.loader = false
    },
    async upgrade(index) {
      this.genNumber = index
      this.showModal()
    },
    async changeGen() {
      this.loader = true

      try {
        const tx = await this.__changeGen(this.genNumber, this.tokenId)
        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              const { receipt } = tx

              if (receipt && receipt.exceptions) {
                MicroModal.show('tx-error')
              }

              if (receipt && receipt.event_logs) {
                this.updateGens()
                this.getPrice()
              }

              this.loader = false
              clearInterval(inter)
            })
            .catch(() => null)
        }, 5000)
      } catch {
        this.loader = false
      }
      this.loader = false
    }
  },
  mounted() {
    this.updateGens()
    this.getPrice()
    this.updateAllowances()
  }
}
</script>

<style>
.gen-number > input{
  padding: 10px 19px;
  text-align: left;
  border-style: solid;
  border-width: 1px;
  border-color: rgb(32, 201, 151);
  color: rgb(32, 201, 151);
  background-color: transparent;
  font-family: 'Open Sans',sans-serif;
  line-height: 19px;
  width: 100%;
}
.gen-number > *::-webkit-input-placeholder {
  color: rgb(32, 201, 151);
  opacity: 0.6;
}
.table {
  width: 100%;
  max-width: 600px;
}
.table > tbody > .values > td {
  color: #e83e8c;
  text-align: inherit;
  max-width: 14px;
  cursor: pointer;
}
.table > tbody > tr > th {
  color: rgb(32, 201, 151);
  text-align: inherit;
  max-width: 14px;
}
.table > tbody .header {
  border-block-width: 1px;
  border-color: rgb(32, 201, 151);
}
.GenLab {
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgb(32, 201, 151) 0px 10px 90px inset;
}
.GenLab__table {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 30px;
  width: 100%;
}
.GenLab__wrapper {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
  max-width: 1024px;
  flex-wrap: wrap;
}
.GenLab__bottle {
  max-width: 300px;
  max-height: 400px;
}
.GenLab__wrapper > .Card > .Card-content {
  animation: LabShadow 1.5s infinite alternate;
  cursor: default;
  height: 300px!important;
  width: 300px!important;
  box-shadow: 0 0 40px 9px #20c997;
}
.GenLab__wrapper > .Card > .card-title {
  color: #20c997;
}
.GenLab__radar {
  width: 100%;
  margin-bottom: 100px;
}

.green {
  color: #20c997;
}
.symbol {
  color: #d0ab2f;
  font-family: 'Open Sans',sans-serif;
}

.GenLab__btn {
  border-color: rgb(32, 201, 151);
  background-color: transparent;
  color: rgb(32, 201, 151);
}
.GenLab__btn:hover {
  border-color: rgb(32, 201, 151);
  background-color: rgb(32, 201, 151);
  box-shadow: 0 16px 23px -13px rgb(32, 201, 151);
  color: #fff;
}

@keyframes LabShadow {
  from {
    box-shadow: 0 0 40px 5px #20c997;
  }
  to {
    box-shadow: 0 0 60px 20px #28a745;
  }
}
</style>

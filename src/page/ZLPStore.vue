<template>
  <div class="container buy-page">
    <div class="container0">
      <div class="illustration">
        <span class="shadow" />
        <img
          src="/images/buy-egg-q.png"
          alt="egg"
          class="egg"
        >
      </div>
      <form>
        <h2 class="title purple uppercase center">
          <span class="yelow">
            {{ zlps }}
          </span>
          Credits
        </h2>
        <hr>
        <h3 class="purple">
          Current Price: {{ onePrice }} <span class="yelow">Credits</span>
        </h3>
        <br>
        <div class="form">
          <div class="inputs">
            <label class="input-label pink">
              <input
                v-model="count"
                type="number"
                min="1"
                max="10"
              >
              Number of eggs
            </label>
            <span class="separator"/>
            <label class="input-label pink">
              <input
                v-model="amount"
                :step="onePrice"
                :min="onePrice"
                :max="onePrice * 15"
                type="number"
              >
              Price
            </label>
          </div>
          <a
            class="nav_btn w-button buy"
            @click="buy"
          >
            Buy
          </a>
        </div>
      </form>
    </div>
  </div>
  <Modal
    title="Bought Eggs"
    name="bought-eggs"
  >
    <p class="purple Credits_p">
      You have just bought {{ count }} <span>Eggs</span>
    </p>
  </Modal>
  <Modal
    title="Transaction error"
    name="tx-error"
  />
  <Modal
    title="Fail buy"
    name="buy-egg-error"
  >
    <p class="danger Credits_p">
      Your transaction has failed
    </p>
  </Modal>
  <Loader v-if="loader">
    Confirmation...
  </Loader>
</template>

<script>
import MicroModal from 'micromodal'
import ZilPayMixin from '@/mixins/zilpay'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'

export default {
  name: 'ZLPStore',
  mixins: [ZilPayMixin],
  components: {
    Modal,
    Loader
  },
  data() {
    return {
      loader: false,
      onePrice: 0,
      count: 0,
      amount: 0,
      zlps: 0
    }
  },
  methods: {
    async updatePrice() {
      const price = await this.__getZLPDragonPrice()

      this.onePrice = price / (10**18)
      this.amount = this.onePrice
      this.count = 1
    },
    async updateCredits() {
      const zlps = await this.__getStorebalance()
      const _zlps = Number(zlps) / 1000000000000000000
      
      this.zlps = _zlps.toLocaleString()
    },
    async buy() {
      this.loader = true
      try {
        const tx = await this.__buyForZLP(this.count)

        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              const { receipt } = tx

              if (receipt && receipt.exceptions) {
                MicroModal.show('buy-egg-error')
                this.loader = false
                clearInterval(inter)
                return null
              }

              if (receipt) {
                MicroModal.show('bought-eggs')
                this.updateCredits()
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
  watch: {
    amount: function(newValue) {
      if (newValue) {
        this.count = Number(newValue) / Number(this.onePrice)
      }
    },
    count: function(newValue) {
      this.amount = Number(newValue) * Number(this.onePrice)
    }
  },
  mounted() {
    this.updatePrice()
    this.updateCredits()
  }
}
</script>

<style>

</style>

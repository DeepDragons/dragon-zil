<template>
  <div class="Credits">
    <form class="Credits__form">
      <h3 class="title purple uppercase center">
        Store Balance
      </h3>
      <hr>
      <p class="purple Credits_p">
        Currnet balance: {{ credits }} <span>Credits</span>
      </p>
      <p class="purple Credits_p">
        ZLP: {{ zlpBalance }} <span>ZLP</span>
      </p>
      <hr>
      <label class="input-label pink">
        <input
          v-model="amount"
          step="1"
          min="1"
          type="number"
        >
        Amount ZLP
      </label>
      <a
        class="nav_btn w-button buy Credits_Button"
        @click="buy"
      >
        Buy
      </a>
    </form>
  </div>
  <Modal
    title="Bought credits"
    name="bought-zlp"
  >
    <p class="purple Credits_p">
      You have just bought {{ amount }} <span>Credits</span>
    </p>
  </Modal>
  <Modal
    title="Transaction error"
    name="tx-error"
  />
  <Modal
    title="Fail buy"
    name="buy-error"
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
import BN from 'bn.js'
import Loader from '@/components/Loader'
import Modal from '@/components/Modal'

export default {
  name: 'Credits',
  mixins: [ZilPayMixin],
  components: {
    Loader,
    Modal
  },
  data() {
    return {
      amount: 10,
      zlpBalance: '0',
      loader: false,
      credits: '0'
    }
  },
  methods: {
    async balanceZLPUpdate() {
      const zlps = await this.__getZLPBalance();
      const _zlps = new BN(zlps)
      const _dicemals = new BN('1000000000000000000')

      this.zlpBalance = _zlps.div(_dicemals).toNumber().toLocaleString()
    },
    async updateCredits() {
      const zlps = await this.__getStorebalance();
      const _zlps = Number(zlps) / 1000000000000000000

      if (_zlps < 1) {
        this.credits = _zlps.toFixed(13)
      } else {
        this.credits = _zlps.toLocaleString()
      }
    },
    async buy() {
      this.loader = true
      const _amount = new BN(this.amount)
      const _dicemals = new BN('1000000000000000000')
      const qaAmount = _amount.mul(_dicemals)

      try {
        const tx = await this.__buyCreadits(String(qaAmount))

        const inter = setInterval(() => {
          window
            .zilPay
            .blockchain
            .getTransaction(tx.TranID)
            .then((tx) => {
              const { receipt } = tx

              if (receipt && receipt.exceptions) {
                MicroModal.show('buy-error')
                this.loader = false
                clearInterval(inter)

                return null
              }

              if (receipt) {
                MicroModal.show('bought-zlp')
                this.balanceZLPUpdate()
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
  mounted() {
    this.balanceZLPUpdate()
    this.updateCredits()
  }
}
</script>

<style>
.Credits {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 100px;
  padding-left: 30px;
  padding-right: 30px;
  padding-bottom: 100px;

  height: 80vh;
}

.Credits__form {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  max-width: 400px;
}
.Credits_p {
  flex: 0 auto;
  font-family: 'Open Sans',sans-serif;
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
}
.Credits_p > span {
  color: #d0ab2f;
}
.danger {
  color: #e83e8c;
}
</style>

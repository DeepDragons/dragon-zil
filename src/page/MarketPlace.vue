<template>
  <div class="dragons">
    <div class="dragons-container">
      <div
        v-if="keys.length === 0"
        class="w-message"
      >
        <h2 class="footer_logo_text wrong-msg">
          Have not dragons for sale yet
        </h2>
      </div>
      <Card
        v-for="(item) of keys"
        :key="item"
        :id="list[item].arguments[2]"
        :showID="false"
        @select="onSelected(list[item].arguments[2])"
      >
        <button
          v-if="list[item].arguments[0] !== onwer"
          class="nav_btn w-button top-btn credits__btn trade-btn"
          @click="buy(item, list[item].arguments[1])"
        >
          Buy #{{ list[item].arguments[2] }}, <span class="yellow">{{ (Number(list[item].arguments[1]) / 1000000000000).toFixed() }}ZIL</span>
        </button>
        <button
          v-if="list[item].arguments[0] === onwer"
          class="nav_btn w-button top-btn trade-btn"
          @click="cancelSale(item)"
        >
          Cancel sale
        </button>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

import ZilPayMixin from '@/mixins/zilpay'
import { WalletStore } from '@/store/wallet'

export default {
  name: 'MarketPlace',
  mixins: [ZilPayMixin],
  components: {
    Card
  },
  data() {
    return {
      list: [],
      onwer: ''
    }
  },
  computed: {
    keys() {
      return Object.keys(this.list)
    }
  },
  methods: {
    async loadDragonsForSale() {
      this.list = await this.__getDragonsForSale()
    },
    async buy(id, price) {
      await this.__buyOnMarketPlace(id, price)
    },
    cancelSale(id) {
      this.__cancelListing(id)
    },
    onSelected(id) {
      this.$router.push({
        name:'Dragon',
        params: { id }
      })
    }
  },
  mounted() {
    this.loadDragonsForSale()

    WalletStore.watch(async(address) => {
      const zilPay = await this.__getZilPay()
      const base16 = zilPay.crypto.fromBech32Address(address)
      this.onwer = String(base16).toLowerCase()
    })
  }
}
</script>

<style>
.dragons {
  display: flex;
  justify-content: center;
  height: 100%;
  min-height: 50vh;

  font-family: 'Fira Sans';

  margin-top: 100px;
  margin-bottom: 100px;
}

.wrong-msg {
  font-size: 32px;
  line-height: 40px;
}
.w-message {
  text-align: center;
}
.wrong-des {
  color: #8973d7;
  font-size: 22px;
  line-height: 65px;
}
.fight-amount > span{
  color: #d0ab2f;
}
.fight-amount {
  color: #8973d7;
}
.dragons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
  height: fit-content;
  grid-gap: 50px;
}
.trade-btn {
  margin-top: 8px;
}
.yellow {
  color: #d0ab2f;
}
</style>

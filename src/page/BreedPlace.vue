<template>
  <div class="dragons">
    <div class="dragons-container">
      <div
        v-if="keys.length === 0"
        class="w-message"
      >
        <p class="wrong-des">
          There are no vended dragons yet, but you can add your own.
        </p>
      </div>
        <Card
          v-for="(item, index) of list"
          :key="index"
          :id="item.id"
          :showID="owner !== item.owner"
          @select="onSelected(item.id)"
        >
          <b
            v-show="owner !== item.owner"
            class="breed-amount"
          >
            {{ (Number(item.price) / 1000000000000000000).toFixed() }} <span>ZLP</span>
          </b>
          <button
            v-show="owner === item.owner"
            class="nav_btn w-button top-btn trade-btn"
            @click="cancelSale(item)"
          >
            Cancel #{{ item.id }}
          </button>
        </Card>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'BreedPlace',
  mixins: [ZilPayMixin],
  components: {
    Card
  },
  data() {
    return {
      list: [],
      owner: null
    }
  },
  computed: {
    keys() {
      return Object.keys(this.list)
    }
  },
  methods: {
    async loadTokens() {
      const zilPay = await this.__getZilPay()
      this.owner = String(zilPay.wallet.defaultAccount.base16).toLowerCase()
      this.list = await this.__getBreedingList()
    },
    onSelected(id) {
      this.$router.push({
        name: 'Breed',
        params: {
          id
        }
      })
    },
    async cancelSale(el) {
      await this.__cancelBreed(el.id)
    }
  },
  mounted() {
    this.loadTokens()
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
.breed-amount > span{
  color: #d0ab2f;
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

.dragons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
  height: fit-content;
  grid-gap: 50px;
}

@media only screen and (max-width: 1000px) {
  .dragons-container {
    padding-top: 50px;
  }
}
</style>

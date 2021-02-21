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
      <router-link
        v-for="(item) of keys"
        :key="item"
        :to="{ name: 'Dragon', params: { id: item } }"
      >
        <Card
          :stage="1"
          :id="item"
        >
          <b class="fight-amount">
            {{ (Number(list[item]) / 1000000000000000000).toFixed() }} <span>ZLP</span>
          </b>
        </Card>
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'MarketPlace',
  mixins: [ZilPayMixin],
  components: {
    Card
  },
  data() {
    return {
      list: []
    }
  },
  computed: {
    keys() {
      return Object.keys(this.list)
    }
  },
  methods: {
    async loadFightes() {
      const tokens = await this.__getWaitingList()

      this.list = tokens

      addDragons(tokens)
    }
  },
  mounted() {
    this.loadFightes()
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
</style>

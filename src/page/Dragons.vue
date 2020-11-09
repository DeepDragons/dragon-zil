<template>
  <div class="dragons">
    <div class="dragons-container">
      <div
        v-if="keys.length === 0"
        class="w-message"
      >
        <h2 class="footer_logo_text wrong-msg">
          You haven't got Eggs!
        </h2>
        <p class="wrong-des">
          If you have got 1000 ZLP you can get eggs for free.
        </p>
      </div>
      <router-link
        v-for="(item) of keys"
        :key="item"
        :to="{ name: 'Dragon', params: { id: item, stage: list[item] } }"
      >
        <Card
          :stage="Number(list[item])"
          :id="item"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'

import { WalletStore } from '@/store/wallet'
import ZilPayMixin from '@/mixins/zilpay'

import {
  DragonsStore,
  addDragons
} from '@/store/dragons'

export default {
  name: 'Dragons',
  mixins: [ZilPayMixin],
  components: {
    Card
  },
  data() {
    return {
      list: DragonsStore.getState()
    }
  },
  computed: {
    keys() {
      return Object.keys(this.list)
    }
  },
  methods: {
    async loadTokens() {
      const tokens = await this.__getTokensIds()

      this.list = tokens

      addDragons(tokens)
    }
  },
  updated() {
    this.loadTokens()
  },
  mounted() {
    DragonsStore.watch((state) => this.list = state)
    this.loadTokens()
    WalletStore.watch(() => this.loadTokens())
  }
}
</script>

<style>
.dragons {
  display: flex;
  justify-content: center;

  width: 100vw;
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

.dragons-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 900px;
  height: fit-content;
  grid-gap: 50px;
}
</style>

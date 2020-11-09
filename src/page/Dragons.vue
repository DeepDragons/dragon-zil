<template>
  <div class="dragons">
    <div class="dragons-container">
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
      const keys = Object.keys(DragonsStore.getState())
      if (keys.length > 0) {
        return null
      }

      const tokens = await this.__getTokensIds()

      addDragons(tokens)
    }
  },
  updated() {
    this.loadTokens()
  },
  mounted() {
    DragonsStore.watch((state) => this.list = state)
    this.loadTokens()
  }
}
</script>

<style>
.dragons {
  display: flex;
  justify-content: center;

  width: 100vw;

  font-family: 'Fira Sans';

  margin-top: 100px;
  margin-bottom: 100px;
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

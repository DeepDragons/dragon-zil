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

export default {
  name: 'Dragons',
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
    async loadTokens() {
      const tokens = await this.__getTokensIds()

      this.list = tokens
    }
  },
  updated() {
    this.loadTokens()
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

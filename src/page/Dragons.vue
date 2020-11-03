<template>
  <NavBar />
  <div class="dragons">
    <div class="dragons-container">
      <Card
        v-for="(item, index) of keys"
        :key="index"
        :stage="Number(list[item])"
        :id="index + 1"
      />
    </div>
  </div>
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Card from '@/components/Card'

import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'Dragons',
  mixins: [ZilPayMixin],
  components: {
    NavBar,
    Footer,
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
  display: grid;
  grid-template-columns: repeat(3,1fr);
  max-width: 900px;
  height: fit-content;
  grid-gap: 50px;
}
</style>

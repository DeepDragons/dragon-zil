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
      <router-link
        v-for="(item) of keys"
        :key="item"
        :to="{ name: 'Dragon', params: { id: item, stage: list[item] } }"
      >
        <Card
          :stage="Number(1)"
          :id="item"
        >
          <b class="breed-amount">
            {{ Number(list[item]) / 1000000000000000000 }} <span>ZLP</span>
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
  name: 'BreedPlace',
  mixins: [ZilPayMixin],
  components: {
    Card
  },
  data() {
    return {
      list: {}
    }
  },
  computed: {
    keys() {
      return Object.keys(this.list)
    }
  },
  methods: {
    async loadTokens() {
      this.list = await this.__getBreedingList()
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

<template>
  <NavBar />
  <div>
    <Card
      :stage="0"
      :id="tokenId"
    />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import { useRoute } from 'vue-router'

import Card from '@/components/Card'
import RadarMixin from '@/mixins/radar'

export default {
  name: 'Dragon',
  mixins: [RadarMixin],
  components: {
    Card,
    NavBar
  },
  setup() {
    const route = useRoute()

    return {
      tokenId: route.params.id
    }
  }
}
</script>

<style>

</style>

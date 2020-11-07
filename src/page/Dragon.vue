<template>
  <div>
    <Card />
  </div>
</template>

<script>
import Card from '@/components/Card'
import RadarMixin from '@/mixins/radar'

export default {
  name: 'Dragon',
  mixins: [RadarMixin],
  components: {
    Card
  },
  mounted() {
  }
}
</script>

<style>

</style>

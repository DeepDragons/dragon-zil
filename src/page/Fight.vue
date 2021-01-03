<template>
  <div class="dragon-page">
    <div class="fights-wrapper">
      <Card
        :stage="1"
        :id="tokenId"
      />
      <Card
        :stage="1"
        :id="tokenId"
      />
    </div>
  </div>
</template>

<script>
// import MicroModal from 'micromodal'
import Card from '@/components/Card'
// import Modal from '@/components/Modal'

import ZilPayMixin from '@/mixins/zilpay'
import RadarMixin from '@/mixins/radar'

export default {
  name: 'Fight',
  mixins: [RadarMixin, ZilPayMixin],
  components: {
    Card,
    // Modal
  },
  data() {
    return {
    }
  },
  computed: {
    tokenId() {
      return this.$route.params.id
    }
  },
  methods: {
  },
  updated() {
  }
}
</script>

<style>
.fights-wrapper {
  padding: 100px;
  display: flex;
}
</style>

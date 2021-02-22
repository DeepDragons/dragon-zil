<template>
  <NavBar />
  <router-view :name="viewName" v-slot="{ Component, route }">
    <component
      v-if="!loader"
      :is="Component"
      :key="route.name === 'repeat' ? route.path : undefined"
    />
  </router-view>
  <Footer />
  <Loader v-if="loader">
    Loading...
  </Loader>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import Loader from '@/components/Loader'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'App',
  mixins: [ZilPayMixin],
  components: {
    NavBar,
    Loader,
    Footer
  },
  data() {
    return {
      loader: true
    }
  },
  setup() {
    const route = useRoute()
    const viewName = ref('default')

    const currentLocation = computed(() => {
      const { ...rest } = route
      return rest
    })

    return {
      currentLocation,
      viewName
    }
  },
  mounted() {
    this.loader = true
    this
      .__getTokenUris()
      .then(() => this.loader = false)
      .catch(() => this.loader = false)
  }
}
</script>

<style>
a {
  color: transparent;
}
</style>

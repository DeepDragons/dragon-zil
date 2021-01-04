<template>
  <NavBar />
  <router-view :name="viewName" v-slot="{ Component, route }">
    <component
      :is="Component"
      :key="route.name === 'repeat' ? route.path : undefined"
    />
  </router-view>
  <Footer />
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
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
  }
}
</script>

<style>

</style>

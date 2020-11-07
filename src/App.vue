<template>
  <router-view :name="viewName" v-slot="{ Component, route }">
    <keep-alive>
      <component
        :is="Component"
        :key="route.name === 'repeat' ? route.path : undefined"
      />
    </keep-alive>
  </router-view>
</template>

<script>
import { inject, computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const route = useRoute()
    const state = inject('state')
    const viewName = ref('default')

    const currentLocation = computed(() => {
      const { ...rest } = route
      return rest
    })

    return {
      currentLocation,
      state,
      viewName
    }
  }
}
</script>

<style>

</style>

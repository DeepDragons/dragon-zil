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
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
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

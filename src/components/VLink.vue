<template>
  <a
    :href="href"
    @click.prevent="go"
  >
    <slot></slot>
  </a>
</template>

<script>

export default {
  name: 'VLink',
  props: {
    href: {
      type:String,
      required: true
    }
  },
  methods: {
    go () {
      this.$root.currentRoute = this.href

      window.history.pushState(null, this.href, this.href)
    }
  }
}
</script>

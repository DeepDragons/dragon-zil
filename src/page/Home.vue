<template>
  <NavBar />
  <Header />
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer,
    Header
  }
}
</script>

<style>
</style>

<template>
  <NavBar />
  <Header />
  <Footer />
</template>

<script>
import NavBar from './components/NavBar'
import Header from './components/Header'
import Footer from './components/Footer'

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
body {
  background-color: rgba(6, 18, 34, 0.95);
}
</style>

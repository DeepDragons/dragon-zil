<template>
  <NavBar />
  <div class="section_hero">
    <div class="cloud_center" />
    <div class="cloud_center_na" />
    <div class="cloud_left" />
    <div class="cloud_left_na" />
    <div class="cloud_right" />
    <div class="cloud_right_na" />
    <div class="dragon_left">
      <div class="left_dragon_wrap">
        <div class="html-embed w-embed w-iframe"></div>
      </div>
    </div>
    <div class="dragon_right">
      <div class="dragon_right_wrap">
        <div class="html-embed-2 w-embed w-iframe" />
      </div>
    </div>
    <div class="container w-container">
      <div class="hero_center">
        <div class="heading_wrap">
          <h1 class="heading heading_center">
            Not found
          </h1>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'NotFound',
  components: {
    NavBar,
    Footer
  }
}
</script>

<style>
</style>
<template>
  <NavBar />
  <div class="dragons">
    <div class="dragons-container">
      <Card
        v-for="(item, index) of list"
        :key="index"
        :id="index + 1"
      />
    </div>
  </div>
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import Card from '@/components/Card'

export default {
  name: 'Dragons',
  components: {
    NavBar,
    Footer,
    Card
  },
  data() {
    return {
      list: Array(5).fill()
    }
  }
}
</script>

<style>
.dragons {
  display: flex;
  justify-content: center;

  width: 100vw;
  height: 100vh;

  font-family: 'Fira Sans';

  margin-top: 100px;
}

.dragons-container {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  max-width: 900px;
  height: fit-content;
  grid-gap: 50px;
}
</style>

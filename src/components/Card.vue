<template>
  <div class="Card">
    <div class="Card-content">
      <img
        :src="imgSrc"
        onerror="this.onerror=null; this.src='https://res.cloudinary.com/dragonseth/image/upload/sub.png'"
        alt="img-dragon"
        width="250"
        height="250"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: Number
    },
    stage: {
      type: Number
    }
  },
  data() {
    return {
      url: 'https://res.cloudinary.com/dragoneth/image/upload'
    }
  },
  computed: {
    imgSrc() {
      const stage = this.stage === 0 ? 'egg' : 'dragon'

      return `${this.url}/${stage}_${this.id}.png`
    }
  }
}
</script>

<style>
.Card {
  flex: 0 0 auto;
  width: auto;
  max-width: 100%;
}
.Card-content {
  border-radius: 100%;
  position: relative;
  transition: .5s;
  cursor: pointer;
  width: 250px;
  height: 250px;

  background-color: rgba(6,18,34,.949);
}
.Card-content:hover {
  box-shadow: inset 0 0 40px #d528d0;
}
</style>

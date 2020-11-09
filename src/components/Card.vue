<template>
  <div class="Card">
    <div class="Card-content">
      <img
        v-if="imgSrc && !isNaN(stage) && !isNaN(id)"
        :src="imgSrc"
        onerror="this.onerror=null; this.src='https://res.cloudinary.com/dragonseth/image/upload/sub.png'"
        alt="img-dragon"
      >
    </div>
    <p class="card-title logo_text">
      #{{ id }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    id: {
      type: String,
      required: true
    },
    stage: {
      type: Number,
      required: true
    }
  },
  computed: {
    imgSrc() {
      return `https://res.cloudinary.com/dragonseth/image/upload/${this.stage}_${this.id}.png`
    }
  }
}
</script>

<style>
.Card {
  flex: 0 0 auto;
  width: auto;
  max-width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.card-title {
  color: #e83e8c;
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

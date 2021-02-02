<template>
  <div class="Card">
    <div class="Card-content">
      <img
        :class="{ flip }"
        :src="imgSrc"
        @error="onError"
        onerror="this.onerror=null; this.src=''"
        alt="img-dragon"
      >
    </div>
    <p class="card-title logo_text">
      #{{ id }} <slot />
    </p>
  </div>
</template>

<script>
const subURL = 'https://res.cloudinary.com/dragonseth/image/upload/v1607844286/sub.png'
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
    },
    flip: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    imgSrc() {
      return `https://res.cloudinary.com/dragonseth/image/upload/${this.stage}_${this.id}.png`
    }
  },
  methods: {
    onError(event) {
      if (event.target.src === subURL) {
        return null
      }

      event.target.src = subURL
    }
  }
}
</script>

<style>
img.flip {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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

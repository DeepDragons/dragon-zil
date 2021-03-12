<template>
  <div class="Card">
    <div class="Card-content">
      <img
        :class="{ flip }"
        :src="imgSrc"
        loading="lazy"
        onerror="this.onerror=null;this.src='https://res.cloudinary.com/dragonseth/image/upload/v1607844286/sub.png';"
        @click="$emit('select')"
      >
    </div>
    <p class="card-title">
      {{ showID ? `#${id}` : '' }} <slot />
    </p>
  </div>
</template>

<script>
import { tokensURLSStore } from '@/store/urls'

export default {
  name: 'Card',
  props: {
    id: {
      type: String,
      required: true
    },
    flip: {
      type: Boolean,
      required: false
    },
    showID: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isError: false
    }
  },
  computed: {
    imgSrc() {
      const urls = tokensURLSStore.getState()

      return urls[this.id]
    }
  },
  methods: {
    onError($event) {
      console.log($event)
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
  font-size: 18px;
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

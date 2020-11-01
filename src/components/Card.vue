<template>
  <div class="Card">
    <div class="Card-content">
      <img
        src="https://res.cloudinary.com/dragoneth/image/upload/egg_5.png"
        alt="img-dragon"
        width="250"
        height="250"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
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

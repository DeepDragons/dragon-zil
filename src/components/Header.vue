<template>
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
            DragonZIL
          </h1>
        </div>
        <div class="hero_text">
          <div class="text-block">
            Here, you can buy Dragons for ZIL,<br>and they will fuck, fight, mutate, and die.
            Because Dragons are no Kitties.
          </div>
        </div>
        <a
          name="reftoapp"
          href="https://eth.dragoneth.com"
          class="btn_primary hero_btn w-button"
        >
          Give. Me. Theegg.
        </a>
        <a href="#about" class="scroll_sign w-inline-block" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'header'
}
</script>

<style>
.left_dragon_wrap {
  animation: move_01 3.5s steps(82) infinite;
}
.dragon_right_wrap {
  animation: move_02 3.5s steps(76) infinite
}
@keyframes move_01 {
  from {
    background-position-x: 0
  }

  to {
    background-position-x: -41000px
  }
}
@keyframes move_02 {
  from {
    background-position-x: 0
  }

  to {
    background-position-x: -24320px
  }
}
</style>
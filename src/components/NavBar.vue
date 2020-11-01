<template>
  <div class="navbar_fixed w-nav">
    <div class="menu_button w-nav-button">
      <div class="burger_image"></div>
      <div class="burger_text_wrap">
        <div class="burger_text">Menu</div>
      </div>
    </div>
    <VLink
      href="/"
      class="brand w-nav-brand"
    >
      <div class="logo_wrap w-clearfix">
        <div class="logo_img_wrap"></div>
        <div class="logo_text">Dragon ZIL</div>
      </div>
    </VLink>
    <nav class="nav-menu w-nav-menu">
      <div class="flex_wrap">
        <div class="links_block">
          <div class="close_btn_wrap">
            <div class="menu_button close w-nav-button">
              <div class="burger_image cross" />
              <div class="burger_text_wrap">
                <div class="burger_text">
                  Close
                </div>
              </div>
            </div>
          </div>
          <VLink
            href="/buy"
            class="nav_link w-nav-link"
          >
            Buy
          </VLink>
          <VLink
            href="/airdrop"
            class="nav_link w-nav-link"
          >
            AirDrop
          </VLink>
          <VLink
            href="/dragons"
            class="nav_link w-nav-link"
          >
            My dragons
          </VLink>
          <VLink
            href="/"
            class="nav_link w-nav-link disabled"
          >
            Marketplace
          </VLink>
          <VLink
            href="/"
            class="nav_link w-nav-link disabled"
          >
            Gen Lab
          </VLink>
        </div>
        <VLink
          href="/buy"
          class="nav_btn w-button"
        >
          <span class="nb_span_01">
            buy an
          </span>
          <span class="nb_span_02">
            egg
          </span>
        </VLink>
      </div>
    </nav>
  </div>
</template>

<script>
import VLink from '@/components/VLink'

export default {
  name: 'NavBar',
  components: {
    VLink
  }
}
</script>

<style>
.disabled {
  opacity: 0.5;
  cursor: progress;
}
.disabled:hover {
  color: #fff;
  text-decoration: none;
  text-shadow: none;
}
</style>

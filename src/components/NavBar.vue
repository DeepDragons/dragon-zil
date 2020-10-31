<template>
  <div class="navbar_fixed w-nav">
    <div class="menu_button w-nav-button">
      <div class="burger_image"></div>
      <div class="burger_text_wrap">
        <div class="burger_text">Menu</div>
      </div>
    </div>
    <a href="/" class="brand w-nav-brand">
      <div class="logo_wrap w-clearfix">
        <div class="logo_img_wrap"></div>
        <div class="logo_text">Dragon ETH</div>
      </div>
    </a>
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
          <a href="/" class="nav_link w-nav-link">
            Where am I? 
          </a>
          <a
            href="#about"
            class="nav_link w-nav-link"
          >
            What&#x27;s going on?
          </a>
          <a
            href="#how-it-work"
            class="nav_link w-nav-link"
          >
            How does it work?
          </a>
          <a
            href="#roadmap"
            class="nav_link w-nav-link"
          >
            Our Roadmap
          </a>
          <a
            href="#friends"
            class="nav_link w-nav-link"
          >
            Referral Program
          </a>
        </div>
        <a
          name="reftoapp"
          href="https://eth.dragoneth.com"
          class="nav_btn w-button"
        >
          <span class="nb_span_01">
            buy an
          </span>
          <span class="nb_span_02">
            egg
          </span>
          <span class="text-span">
            eth
          </span>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style>

</style>

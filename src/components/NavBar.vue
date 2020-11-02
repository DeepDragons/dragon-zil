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
        <a
          class="nav_btn w-button"
          @click="connect"
        >
          {{ address }}
        </a>
      </div>
    </nav>
  </div>
  <Modal
    title="ZilPay"
    name="no-zipay"
  >
    <div class="hasnt-zilpay">
      <p class="info">
        Did you install ZIlPay wallet?
      </p>
      <br>
      <a href="https://zilpay.xyz/" target="_blank">
        <img
          src="/img/zilpay.svg"
          alt="zilpaylogo"
          height="150"
          width="150"
        >
      </a>
    </div>
  </Modal>
</template>

<script>
import VLink from '@/components/VLink'
import Modal from '@/components/Modal'
import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'NavBar',
  mixins: [ZilPayMixin],
  components: {
    VLink,
    Modal
  },
  data() {
    return {
      address: 'wallet connect'
    }
  },
  methods: {
    async connect() {
      try {
        this.__connect()
        const zilpay = await this.__getZilPay()

        this.address = this.__trim(zilpay.wallet.defaultAccount.bech32)
      } catch (err) {
        console.error(err)
      }
    }
  },
  mounted() {
    this
      .__getZilPay()
      .then((zilpay) => {
        if (zilpay.wallet.defaultAccount) {
          this.address = this.__trim(zilpay.wallet.defaultAccount.bech32)

          return this.address
        }

        setTimeout(() => {
          if (zilpay.wallet.defaultAccount.bech32) {
            this.address = this.__trim(zilpay.wallet.defaultAccount.bech32)
          }
        }, 500)
      })
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
.w-button {
  text-transform: none;
}
.hasnt-zilpay, .modal__footer {
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
  color: #8973d7;
}
</style>

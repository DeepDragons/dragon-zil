<template>
  <div
    data-collapse="medium"
    data-animation="over-left"
    data-duration="400"
    data-w-id="563dd592-c922-2a09-1ab2-d33f54dfb545"
    class="navbar_fixed w-nav"
  >
    <div
      class="menu_button w-nav-button"
      @click="showmenu"
    >
      <div class="burger_image"></div>
      <div class="burger_text_wrap">
        <div class="burger_text">Menu</div>
      </div>
    </div>
    <router-link
      to="/"
      class="brand w-nav-brand"
    >
      <div class="logo_wrap w-clearfix">
        <div class="logo_img_wrap"></div>
        <div class="logo_text">Dragon ZIL</div>
      </div>
    </router-link>
    <nav :class="isShow ? 'nav-menu w-nav-menu w--nav-menu-open' : 'nav-menu w-nav-menu'">
      <div class="flex_wrap">
        <div class="links_block">
          <div class="close_btn_wrap">
            <div
              class="menu_button close w-nav-button"
              @click="showmenu"
            >
              <div class="burger_image cross" />
              <div class="burger_text_wrap">
                <div class="burger_text">
                  Close
                </div>
              </div>
            </div>
          </div>
          <router-link
            to="/buy"
            class="nav_link w-nav-link"
          >
            Buy
          </router-link>
          <router-link
            to="/airdrop"
            class="nav_link w-nav-link"
          >
            AirDrop
          </router-link>
          <router-link
            to="/dragons"
            class="nav_link w-nav-link"
          >
            My dragons
          </router-link>
          <router-link
            to="/"
            class="nav_link w-nav-link disabled"
          >
            Fights
          </router-link>
          <router-link
            to="/"
            class="nav_link w-nav-link disabled"
          >
            Gen Lab
          </router-link>
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
  <Modal
    title="ZilPay"
    name="no-netwrok"
  >
    <div class="hasnt-zilpay">
      <p class="info">
        Please change to <span>{{ __netwrok }}</span>
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
import Modal from '@/components/Modal'
import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'NavBar',
  mixins: [ZilPayMixin],
  components: {
    Modal
  },
  data() {
    return {
      address: 'wallet connect',
      isShow: false
    }
  },
  methods: {
    showmenu() {
      this.isShow = !this.isShow
    },
    async connect() {
      try {
        await this.__connect()
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
.w-nav {
  background-color: rgba(6, 18, 34, 0.95);
}
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
.info > span {
  color: #e83e8c;
}
</style>

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
            to="/store"
            class="nav_link w-nav-link"
          >
            ZLPStore
          </router-link>
          <router-link
            to="/dragons"
            class="nav_link w-nav-link"
          >
            My dragons
          </router-link>
          <router-link
            to="/fights"
            class="nav_link w-nav-link"
          >
            Fights
          </router-link>
          <router-link
            to="/breeding"
            class="nav_link w-nav-link"
          >
            Breed
          </router-link>
          <router-link
            to="/trade"
            class="nav_link w-nav-link"
          >
            Trade
          </router-link>
        </div>
        <div class="nav-buttons-wrapper">
          <a
            class="nav_btn w-button"
            @click="connect"
          >
            {{ address }}
          </a>
          <a
            class="nav_btn w-button credits__btn"
          >
            {{ zlps }} ZLP
          </a>
        </div>
      </div>
    </nav>
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
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import ZilPayMixin from '@/mixins/zilpay'

import { changeAddress } from '@/store/wallet'

export default {
  name: 'NavBar',
  mixins: [ZilPayMixin],
  components: {
    Modal
  },
  data() {
    return {
      address: 'wallet connect',
      isShow: false,
      zlps: 0
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

        zilpay
          .wallet
          .observableAccount()
          .subscribe((account) => {
            changeAddress(account.bech32)
            this.address = this.__trim(account.bech32)
          })
      } catch (err) {
        console.error(err)
      }

      const zlps = await this.__getStorebalance()
      const _zlps = Number(zlps) / 1000000000000000000

      this.zlps = _zlps.toLocaleString()
    }
  },
  mounted() {
    this.connect()
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
.nav-buttons-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.nav-buttons-wrapper > .nav_btn {
  margin-left: 5px;
}
.credits__btn {
  color: #7F3BD6;
  border-color: #7F3BD6;
}
.credits__btn:hover {
  color: #fff;
  background-color: #7F3BD6;
  border-color: #7F3BD6;
  box-shadow: 0 16px 23px -13px #7F3BD6;
}
</style>

<template>
  <div class="container">
    <div class="container0">
      <div class="illustration">
        <span class="shadow" />
        <img
          src="/images/buy-egg-q.png"
          alt="egg"
          class="egg"
        >
      </div>
      <div>
        <h2 class="title purple uppercase center">
          <span class="yelow">
            {{ totalSupply }}
          </span>
          eggs
        </h2>
        <hr>
        <br>
        <p class="egg-price purple">
          ZilPay wallet airdrop, buy tokens on <a
            href="https://zilswap.io/swap"
            target="_blank"
            class="nav_link link"
          >zilswap</a>
        </p>
        <br>
        <p class="egg-price purple">
          If you have got <span class="pink">1000</span> <span class="yelow">ZLP</span> you can get egg for free.
        </p>
        <hr>
        <div class="form">
          <button
            class="nav_btn w-button buy"
            :disabled="balanceError || alreadyGotErro"
            @click="onAirdrop"
          >
            Get
          </button>
          <br>
          <p
            v-show="balanceError"
            class="error"
          >
            You haven't got so much ZLP tokens, try buy on <a class="nav_link" href="https://zilswap.io">ZilSwap</a>
          </p>
          <p
            v-show="alreadyGotErro"
            class="error"
          >
            Your address already got eggs.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import ZilPayMixin from '@/mixins/zilpay'

export default {
  name: 'Airdrop',
  mixins: [ZilPayMixin],
  data() {
    return {
      value: 1,
      totalSupply: 0,
      balanceError: false,
      alreadyGotErro: false
    }
  },
  methods: {
    async getSignature() {
      try {
        const zilPay = await this.__getZilPay()
        const address = zilPay.wallet.defaultAccount.base16
        const res = await axios
          .post('/sign/' + address)

        await this.__callAirDrop(res.data)
      } catch (err) {
        if (err.response && err.response.data.code === 1) {
          this.balanceError = true
        }
        console.log(err)
      }
    },
    async onAirdrop() {
      this.balanceError = false

      await this.getSignature()
    }
  },
  updated() {
    this
      .__isGotDragon()
      .then((value) => this.alreadyGotErro = value)
  },
  mounted() {
    this
      .__isGotDragon()
      .then((value) => this.alreadyGotErro = value)
    this
      .__getTotalSupply()
      .then(totalSupply => this.totalSupply = totalSupply)
  }
}
</script>

<style>
hr {
  border-radius: 100px;
  border-color: #8973d7;
}
.bgr_00 {
  opacity: 0.2;
}
.buy {
  min-width: 150px;
}
.container, .container0 {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;

  width: 100vw;
  height: 100vh;

  padding-bottom: 10%;

  font-family: 'Fira Sans';
}
.error {
  line-height: 24px;
  font-weight: 700;
  color: #ff0074;
  font-size: 16px;
  text-align: center;
}
.container0 {
  max-width: 1200px;
}
.input-label {
  display: flex;
  flex-direction: column;
}
.input-label > input {
  padding: 10px 19px;
  align-self: center;
  border-style: solid;
  border-width: 1px;
  border-color: rgba(208,171,47,.6);
  background-color: transparent;
  font-family: 'Open Sans',sans-serif;
  color: #d0ab2f;
  line-height: 19px;
  text-align: center;
  text-transform: uppercase;
}
.inputs {
  display: flex;
  justify-content: space-between;
}
.link {
  padding: 0;
}
.egg {
  z-index: 10;
}
.separator {
  width: 10px;
}
.form {
  display: flex;
  flex-direction: column;
  justify-content: center;

  max-width: 400px;
  min-width: 320px;
}
.shadow {
  position: absolute;
  box-shadow: 0 0 100px 100px #8973d7;
  transform: translate(150px, 150px);

  z-index: -1;
}
.title {
  color: #fff;
  font-size: 35px;
  line-height: 24px;
  font-weight: 700;
  padding-bottom: 20px;
}
.egg-price {
  font-size: 20px;
  line-height: 24px;
  font-weight: 700;
}
.cost {
  font-size: 15px;
  line-height: 24px;
  font-weight: 700;
}
.uppercase {
  text-transform: uppercase;
}
.pink {
  color: #e83e8c;
}
.purple {
  color: #8973d7;
}
.yelow {
  color: #d0ab2f;
}
.center {
  text-align: center;
}
</style>

<template>
  <NavBar />
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
      <form>
        <h2 class="title purple uppercase">
          <span class="yelow">
            256
          </span>
          eggs sold
        </h2>
        <hr>
        <h3 class="title pink">
          Price
        </h3>
        <br>
        <p class="egg-price purple">
          Price of last egg: 0.00498 <span class="yelow">ZIL</span>
        </p>
        <br>
        <p class="egg-price purple">
          Price of next egg: 0.00518 <span class="yelow">ZIL</span>
        </p>
        <br>
        <p class="cost purple">
          The cost of each new egg will be increased by: 0.0001 <span class="yelow">ZIL</span>
        </p>
        <hr>
        <h3 class="purple">
          Current Price: 0.00508 <span>ZIL</span>
        </h3>
        <br>
        <br>
        <div class="form">
          <div class="inputs">
            <label class="input-label pink">
              <input
                type="number"
                min="1"
              >
              Number of eggs
            </label>
            <span class="separator"/>
            <label class="input-label pink">
              <input
                type="number"
              >
              Price
            </label>
          </div>
          <a
            class="nav_btn w-button"
          >
            Buy
          </a>
        </div>
      </form>
    </div>
  </div>
  <Footer />
</template>

<script>
import 'vue-range-component/dist/vue-range-slider.css'

import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default {
  name: 'Buy',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      value: 1
    }
  }
}
</script>

<style>
.bgr_00 {
  opacity: 0.2;
}
.container, .container0 {
  display: flex;
  justify-content: space-evenly;

  width: 100vw;
  height: 100vh;

  padding-top: 5%;

  font-family: 'Fira Sans';
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
</style>

<template>
  <div class="container buy-page">
    <div class="container0">
      <form>
        <h2 class="title purple uppercase center">
          <span class="yelow">
            432423
          </span>
          Credits
        </h2>
        <hr>
        <h3 class="title pink">
          ZLP Price
        </h3>
        <br>
        <p class="egg-price purple">
          Price of last egg: 333 <span class="yelow">ZLP</span>
        </p>
        <p class="egg-price purple">
          Price of next egg: 334 <span class="yelow">ZLP</span>
        </p>
        <p class="cost purple">
          The cost of each new egg will be increased by: 0.002 <span class="yelow">ZLP</span>
        </p>
        <hr>
        <h3 class="purple">
          Current Price: 335 <span class="yelow">ZIL</span>
        </h3>
        <br>
        <div class="form">
          <div class="inputs">
            <label class="input-label pink">
              <input
                v-model="count"
                type="number"
                min="1"
                max="10"
              >
              Number of eggs
            </label>
            <span class="separator"/>
            <label class="input-label pink">
              <input
                v-model="amount"
                :step="amountStep"
                :min="amountStep"
                :max="amountStep * 10"
                type="number"
              >
              Price
            </label>
          </div>
          <a
            class="nav_btn w-button buy"
            @click="buy"
          >
            Buy
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZLPStore'
}
</script>

<style>

</style>

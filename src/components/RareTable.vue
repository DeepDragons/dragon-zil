<template>
  <div
    v-if="values"
    class="RareTable"
  >
    <h3 class="RareTable-title pink">
      Rarity of elements:
    </h3>
    <div class="RareTable-list">
      <div
        v-for="(key, index) of list"
        :key="index"
        :style="{
          color: values[key].color
        }"
        class="RareTable-item"
      >
        <div class="RareTable-key">
          {{ key }}
        </div>
        <span>
          {{ values[key].name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RareTable',
  props: {
    values: {
      type: Object,
      required: true
    }
  },
  computed: {
    list() {
      return Object.keys(this.values)
    }
  }
}
</script>

<style>
.RareTable-title {
  font-size: 19px;
}
.RareTable-item {
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  padding: 5px;
  margin: 5px;
}
.RareTable-key {
  font-weight: bold;
  text-transform: capitalize;
}
</style>

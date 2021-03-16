<template>
  <table
    v-if="values"
    class="RareTable"
  >
  <thead>
    <tr class="RareTable-item">
      <th scope="col" class="RareTable-key pink">Element</th>
      <th scope="col" class="RareTable-key pink">Rarity</th>
      <th scope="col" class="RareTable-key pink">Gen</th>
      <th scope="col" class="RareTable-key pink">Chance</th>
    </tr>
  </thead>
  <tbody>
    <tr
      v-for="(key, index) of list"
      :key="index"
      :style="{
        color: values[key].color
      }"
      class="RareTable-item"
    >
      <td class="RareTable-key">{{ key }}</td>
      <td class="RareTable-name">{{ values[key].name }}</td>
      <td>{{ values[key].gen }}</td>
      <td>{{ values[key].chance }}%</td>
    </tr>
  </tbody>
  </table>
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
.RareTable {
  width: 100%;
  text-align: left;
  margin: 30px;
}
.RareTable-name {
  text-align: left;
}
.RareTable-item {
  /* border: 1px solid; */
  padding: 5px;
  margin: 5px;
  width: 100%;
}
.RareTable-key {
  font-weight: bold;
  text-transform: capitalize;
  line-height: 30px;
}
</style>

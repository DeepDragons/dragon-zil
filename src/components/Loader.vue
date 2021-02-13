<template>
  <div class="block"/>
  <div class="flexbox">
    <div class="spinner-wrapper">
      <div class="nb-spinner" />
      <div class="spinner-text">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style>
.block {
  background-color: rgba(0, 0, 0, 0.473);
  z-index: 90;
}
.spinner-text {
  color: #6f42c1;
  font-size: 20px;
  line-height: 24px;
  width: 100%;
  text-align: center;
}
.spinner-wrapper {
  display: flex;
  flex-direction: column;
}
.flexbox, .block {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}
.flexbox > div {
  width: 300px;
  height: 300px;
  flex: 0 0 25%;
  box-sizing: border-box;
  margin: 0;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.nb-spinner {
  width: 100px;
  height: 100px;
  margin: 0;
  background: transparent;
  border-top: 4px solid #e83e8c;
  border-right: 4px solid transparent;
  border-radius: 50%;
  animation: 1s spin linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
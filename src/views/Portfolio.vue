<template>
  <div class="container">
    <div class="item" />
    <div class="item" />
    <div class="item" />
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 25vw 25vw 25vw;
  grid-template-rows: 50vh;
}

.item {
  border: 1px solid;
  border-color: rgb(210, 210, 210);
  transition: border-color 0.15s;
}

.item:first-child {
  margin-right: 10px;
}

.item:nth-child(2) {
  margin-left: 10px;
  margin-right: 10px;
}

.item:last-child {
  margin-left: 10px;
}

.item:hover {
  border-color: rgb(160, 160, 160);
  cursor: pointer;
}
</style>

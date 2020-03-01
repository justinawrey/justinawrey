<template>
  <div class="home">
    <span class="header">Justin Awrey</span>
    <router-link to="blog" class="option" tag="span">Blog</router-link>
    <router-link to="portfolio" class="option" tag="span"
      >Portfolio</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.header {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.option {
  font-size: 1.5rem;
  cursor: pointer;
}

.option:hover {
  font-weight: bold;
}

.home {
  display: flex;
  flex-direction: column;
}
</style>

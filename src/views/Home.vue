<template>
  <div class="home">
    <span class="header">Justin Awrey</span>
    <span class="annotation">One stop web designer + developer.</span>
    <router-link to="blog" class="option" tag="span">Blog</router-link>
    <router-link to="portfolio" class="option" tag="span"
      >Portfolio</router-link
    >
    <router-link to="inquiries" class="option" tag="span"
      >Inquiries</router-link
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
  margin-bottom: 0.2rem;
}

.annotation {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.option {
  font-size: 1.5rem;
  cursor: pointer;
  transition: opacity 0.15s;
  margin-right: auto;
}

.option:hover {
  opacity: 0.5;
}

.home {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div class="nav">
    <router-link class="header" to="Justin Awrey">JA</router-link>
    <router-link class="nav-item" to="blog">Blog</router-link>
    <router-link class="nav-item" to="portfolio">Portfolio</router-link>
    <router-link class="nav-item" to="inquiries">Inquiries</router-link>
  </div>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
}

.nav-item {
  text-decoration: none;
  color: black;
  font-size: 1rem;
  transition: all 0.15s;
}

.nav-item:hover {
  opacity: 0.5;
}

.header {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
  margin-right: auto;
  margin-left: -5px;
  border: 1px solid black;
  border-radius: 50%;
  padding: 0.4rem;
  text-decoration: none;
  color: black;
  transition: all 0.15s;
}

.header:hover {
  opacity: 0.5;
}

.router-link-active {
  transform: translateX(5px);
  font-weight: bold;
}

.router-link-active::before {
  content: "• ";
}
</style>

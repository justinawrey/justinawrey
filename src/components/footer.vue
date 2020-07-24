<template>
  <span class="footer">
    <font-awesome-icon
      class="brand"
      :icon="['fab', 'linkedin-in']"
      @click="openUrl('https://www.linkedin.com/in/justin-awrey-2b91a7119/')"
    />
    <font-awesome-icon
      class="brand"
      :icon="['fab', 'medium-m']"
      @click="openUrl('https://medium.com/@awreyjustin')"
    />
    <font-awesome-icon
      class="brand"
      :icon="['fab', 'github-alt']"
      @click="openUrl('https://www.github.com/justinawrey')"
    />
  </span>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Footer",

  components: {
    FontAwesomeIcon
  },

  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
.footer {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
}

.brand {
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 0.7rem;
  transition: opacity 0.15s;
}

.brand:hover {
  font-weight: lighter;
  opacity: 0.5;
}
</style>

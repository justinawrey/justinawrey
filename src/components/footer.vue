<template>
  <div class="footer">
    <div class="right">
      <font-awesome-icon
        class="brand"
        :icon="['fab', 'linkedin-in']"
        @click="openUrl('https://www.linkedin.com/in/justin-awrey-2b91a7119/')"
      />
      <font-awesome-icon
        class="brand"
        :icon="['fab', 'github-alt']"
        @click="openUrl('https://www.github.com/justinawrey')"
      />
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "Footer",

  components: {
    FontAwesomeIcon,
  },

  methods: {
    openUrl(url) {
      window.open(url, "_blank");
    },
  },
};
</script>

<style scoped>
.footer {
  position: absolute;
  bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
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

.right {
  position: absolute;
  right: 1rem;
  bottom: 0.2rem;
}
</style>

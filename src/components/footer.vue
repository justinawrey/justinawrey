<template>
  <div class="footer">
    <div class="left">
      Availability:
      <span class="green">currently accepting freelance work.</span>
    </div>
    <div class="right">
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
    </div>
  </div>
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
  position: absolute;
  bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-left: 1rem;
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

.green {
  color: #1b663e;
}

.right {
  margin-right: 2rem;
  margin-bottom: 0.1rem;
}
</style>

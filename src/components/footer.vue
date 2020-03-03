<template>
  <span class="footer">
    <font-awesome-icon
      class="brand"
      :icon="['fab', 'facebook-f']"
      @click="openUrl('https://www.facebook.com/justin.awrey')"
    />
    <font-awesome-icon
      class="brand"
      :icon="['fab', 'instagram']"
      @click="openUrl('https://www.instagram.com/justinawrey/')"
    />
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
    <span class="divider">&#x7c;</span>
    <router-link class="item" to="inquiries" tag="span">Inquiries</router-link>
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

.divider {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.item:hover {
  font-weight: bold;
  cursor: pointer;
}

.brand {
  cursor: pointer;
  font-size: 1.5rem;
  margin-left: 0.7rem;
}

.brand:hover {
  font-weight: lighter;
  opacity: 0.75;
}
</style>

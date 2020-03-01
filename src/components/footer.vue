<template>
  <span class="footer">
    <font-awesome-icon class="brand" :icon="['fab', 'facebook-f']" />
    <font-awesome-icon class="brand" :icon="['fab', 'instagram']" />
    <font-awesome-icon class="brand" :icon="['fab', 'linkedin-in']" />
    <font-awesome-icon class="brand" :icon="['fab', 'medium-m']" />
    <font-awesome-icon class="brand" :icon="['fab', 'github-alt']" />
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

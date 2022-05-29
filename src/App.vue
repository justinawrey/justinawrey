<template>
  <transition appear name="fade">
    <div id="app">
      <transition name="fade-fast">
        <sticky-nav :class="{ delay: !atHome }" v-show="!atHome" />
      </transition>
      <transition name="fade-fast" mode="out-in">
        <router-view />
      </transition>
      <sticky-footer />
    </div>
  </transition>
</template>

<script>
import StickyFooter from "./components/footer";
import StickyNav from "./components/nav";

export default {
  name: "App",

  components: {
    StickyFooter,
    StickyNav
  },

  computed: {
    atHome() {
      return this.$route.path === "/";
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:300&display=swap");

html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  font-family: "Raleway";
}

#app {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fade-enter,
.fade-fast-enter,
.fade-fast-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 600ms ease-in;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 200ms ease-out;
}

.delay {
  transition-delay: 200ms;
}
</style>

<template>
  <transition appear name="fade">
    <div id="app">
      <transition name="fade-fast" mode="out-in">
        <router-view />
      </transition>
      <sticky-footer />
    </div>
  </transition>
</template>

<script>
import StickyFooter from "@/components/footer";

export default {
  name: "App",

  components: {
    StickyFooter
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Raleway:300&display=swap");

html,
body,
#app {
  height: 100vh;
  width: 100vw;
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
</style>

<template>
  <span class="container">
    <transition name="fade-fast" mode="out-in">
      <div v-if="loading" class="loading" key="loading">
        <spinner class="spinner" />
        <span>Please wait&#x2026;</span>
      </div>
      <div v-else class="loaded" key="loaded">
        <span class="header">Thank you!</span>
        <span class="subheader"
          >I've received your inquiry, and I'll be in touch.
        </span>
      </div>
    </transition>
  </span>
</template>

<script>
import Spinner from "../components/spinner";

export default {
  name: "Thanks",

  components: {
    Spinner
  },

  data() {
    return {
      loading: true
    };
  },

  created() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
};
</script>

<style scoped>
.spinner {
  height: 4rem;
  width: 4rem;
  margin: 0 0 1rem 0;
}

.loading,
.loaded {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  font-size: 3rem;
  margin-bottom: 0.7rem;
}

.subheader {
  font-size: 1.1rem;
  margin-bottom: 0.7rem;
}

.fade-fast-leave-to,
.fade-fast-enter {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 120ms ease-out;
}
</style>

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faMediumM,
  faGithubAlt
} from "@fortawesome/free-brands-svg-icons";

library.add(
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faMediumM,
  faGithubAlt,
  faCheck,
  faTimes
);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

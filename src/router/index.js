import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Inquiries from "../views/Inquiries";
import Blog from "../views/Blog";
import Portfolio from "../views/Portfolio";
import Thanks from "../views/Thanks";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/inquiries",
    name: "Inquiries",
    component: Inquiries
  },
  {
    path: "/blog",
    name: "Blog",
    component: Blog
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio
  },
  {
    path: "/thanks",
    name: "Thank You",
    component: Thanks
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;

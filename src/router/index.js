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
    name: "home",
    component: Home
  },
  {
    path: "/inquiries",
    name: "inquiries",
    component: Inquiries
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog
  },
  {
    path: "/portfolio",
    name: "portfolio",
    component: Portfolio
  },
  {
    path: "/thanks",
    name: "thanks",
    component: Thanks
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;

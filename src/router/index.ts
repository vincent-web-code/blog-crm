import Vue from "vue";
import VueRouter, { RouteConfig, RawLocation } from "vue-router";
import Main from "../views/Main.vue";

const originalPush: any = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: RawLocation): any {
  return originalPush.call(this, location).catch((err: any) => err)
}

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login/login.vue"),
    meta: {
      isPublic: true
    }
  },
  {
    path: "/",
    name: "Main",
    component: Main,
    children: [
      // 分类
      {
        path: "/categories/create",
        component: () => import("../views/Category/categoryEdit.vue")
      },
      {
        path: "/categories/list",
        component: () => import("../views/Category/categoryList.vue")
      },
      {
        path: "/categories/edit/:id",
        component: () => import("../views/Category/categoryEdit.vue"),
        props: true
      },

      // 文章
      {
        path: "/article/create",
        component: () => import("../views/Article/articleEdit.vue")
      },
      {
        path: "/article/list",
        component: () => import("../views/Article/articleList.vue")
      },
      {
        path: "/article/edit/:id",
        component: () => import("../views/Article/articleEdit.vue"),
        props: true
      },

      // 评论
      {
        path: "/comment/list",
        component: () => import("../views/Comment/commentList.vue")
      },

      // 管理员
      {
        path: "/adminUser/create",
        component: () => import("../views/AdminUser/adminUserEdit.vue")
      },
      {
        path: "/adminUser/edit/:id",
        component: () => import("../views/AdminUser/adminUserEdit.vue"),
        props: true
      },
      {
        path: "/adminUser/list",
        component: () => import("../views/AdminUser/adminUserList.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return router.push('/login')
  }
  next();
})
export default router;

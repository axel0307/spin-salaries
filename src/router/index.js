import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "dashboard" */ "../views/Dashboard.vue"),
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: () =>
          import(/* webpackChunkName: "welcome" */ "../views/Welcome.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | Dashboard" }
      },
      {
        path: "listemployees",
        name: "ListEmployees",
        component: () =>
          import(
            /* webpackChunkName: "listemployees" */ "../views/ListEmployees.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Empleados" }
      },
      {
        path: "registeremployees",
        name: "RegisterEmployees",
        component: () =>
          import(
            /* webpackChunkName: "registeremployees" */ "../views/RegisterEmployees.vue"
          ),
        meta: {
          requiresAuth: true,
          title: "Spin Salaries | Registro de empleados"
        }
      },
      {
        path: "editemployee/:id",
        name: "EditEmployee",
        component: () =>
          import(
            /* webpackChunkName: "editemployee" */ "../views/EditEmployee.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Editar empleado" }
      },
      {
        path: "listjobs",
        name: "ListJobs",
        component: () =>
          import(/* webpackChunkName: "listjobs" */ "../views/ListJobs.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | Trabajos" }
      },
      {
        path: "registerjobs",
        name: "RegisterJobs",
        component: () =>
          import(
            /* webpackChunkName: "registerjobs" */ "../views/RegisterJobs.vue"
          ),
        meta: {
          requiresAuth: true,
          title: "Spin Salaries | Registro de trabajos"
        }
      },
      {
        path: "editjob/:id",
        name: "EditJob",
        component: () =>
          import(/* webpackChunkName: "editjob" */ "../views/EditJob.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | Editar trabajo" }
      },
      {
        path: "listperceptions",
        name: "ListPerceptions",
        component: () =>
          import(
            /* webpackChunkName: "listperceptions" */ "../views/ListPerceptions.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Percepciones" }
      },
      {
        path: "registerperceptions",
        name: "RegisterPerceptions",
        component: () =>
          import(
            /* webpackChunkName: "registerperceptions" */ "../views/RegisterPerceptions.vue"
          ),
        meta: {
          requiresAuth: true,
          title: "Spin Salaries | Registro de percepciones"
        }
      },
      {
        path: "editperception/:id",
        name: "EditPerception",
        component: () =>
          import(
            /* webpackChunkName: "editperception" */ "../views/EditPerception.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Editar percepción" }
      },
      {
        path: "listdeductions",
        name: "ListDeductions",
        component: () =>
          import(
            /* webpackChunkName: "listdeductions" */ "../views/ListDeductions.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Deducciones" }
      },
      {
        path: "registerdeductions",
        name: "RegisterDeductions",
        component: () =>
          import(
            /* webpackChunkName: "registerdeductions" */ "../views/RegisterDeductions.vue"
          ),
        meta: {
          requiresAuth: true,
          title: "Spin Salaries | Registro de deducciones"
        }
      },
      {
        path: "editdeduction/:id",
        name: "EditDeduction",
        component: () =>
          import(
            /* webpackChunkName: "editdeduction" */ "../views/EditDeduction.vue"
          ),
        meta: { requiresAuth: true, title: "Spin Salaries | Editar deducción" }
      },
      {
        path: "payment/:id",
        name: "Payment",
        component: () =>
          import(/* webpackChunkName: "payment" */ "../views/Payment.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | Pago de nómina" }
      },
      {
        path: "liquidate",
        name: "Liquidate",
        component: () =>
          import(/* webpackChunkName: "liquidate" */ "../views/Liquidate.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | Liquidación" }
      },
      {
        path: "/404",
        component: () =>
          import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
        meta: { requiresAuth: true, title: "Spin Salaries | 404" }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title;

  // if(to.meta.requiresAuth){
  //   if(localStorage.getItem("user")){
  //     next();
  //   } else{
  //     next("/");
  //   }
  // } else if (!to.matched.length) {
  //   next('/404');
  // } else {
  //   next();
  // }
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !(await store.dispatch("user/getCurrentUser"))) {
    next({ name: "Home" });
  } else if (!requiresAuth && (await store.dispatch("user/getCurrentUser"))) {
    next({ name: "Welcome" });
  } else {
    next();
  }
});

export default router;

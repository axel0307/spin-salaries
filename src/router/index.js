import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    // route level code-splitting
    // this generates a separate chunk (dashboard.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
      children: [
    {
        path: 'welcome',
        name: 'Welcome',
        component: () => import(/* webpackChunkName: "welcome" */ '../views/Welcome.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: 'listemployees',
        name: 'ListEmployees',
        component: () => import(/* webpackChunkName: "listemployees" */ '../views/ListEmployees.vue'),
        meta: { requiresAuth: true }
    },
    {
      path: 'registeremployees',
      name: 'RegisterEmployees',
      component: () => import(/* webpackChunkName: "registeremployees" */ '../views/RegisterEmployees.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'editemployee/:id',
      name: 'EditEmployee',
      component: () => import(/* webpackChunkName: "editemployee" */ '../views/EditEmployee.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'listjobs',
      name: 'ListJobs',
      component: () => import(/* webpackChunkName: "listjobs" */ '../views/ListJobs.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'registerjobs',
      name: 'RegisterJobs',
      component: () => import(/* webpackChunkName: "registerjobs" */ '../views/RegisterJobs.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'editjob/:id',
      name: 'EditJob',
      component: () => import(/* webpackChunkName: "editjob" */ '../views/EditJob.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'listperceptions',
      name: 'ListPerceptions',
      component: () => import(/* webpackChunkName: "listperceptions" */ '../views/ListPerceptions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'registerperceptions',
      name: 'RegisterPerceptions',
      component: () => import(/* webpackChunkName: "registerperceptions" */ '../views/RegisterPerceptions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'editperception/:id',
      name: 'EditPerception',
      component: () => import(/* webpackChunkName: "editperception" */ '../views/EditPerception.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'listdeductions',
      name: 'ListDeductions',
      component: () => import(/* webpackChunkName: "listdeductions" */ '../views/ListDeductions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'registerdeductions',
      name: 'RegisterDeductions',
      component: () => import(/* webpackChunkName: "registerdeductions" */ '../views/RegisterDeductions.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: 'editdeduction/:id',
      name: 'EditDeduction',
      component: () => import(/* webpackChunkName: "editdeduction" */ '../views/EditDeduction.vue'),
      meta: { requiresAuth: true }
    }]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth){
    if(localStorage.getItem("user")){
      next();
    } else{
      next("/");
    }
  } else {
    next();
  }

  }
)

export default router

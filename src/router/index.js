import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    component: resolve => require(['../components/common/Home.vue'], resolve),
    children: [{
        path: '/',
        component: resolve => require(['../components/page/Readme.vue'], resolve)
      },
      {
        path: '/employeelist',
        component: resolve => require(['../components/page/employeeList.vue'], resolve)
      },
      {
        path: '/customerlist',
        component: resolve => require(['../components/page/customerList.vue'], resolve) // vue-datasource组件
      },
      {
        path: '/Redistribution',
        component: resolve => require(['../components/page/Redistribution.vue'], resolve)
      },
      {
        path: '/eduCheck',
        component: resolve => require(['../components/page/eduCheck.vue'], resolve) // Vue-Quill-Editor组件
      },
      {
        path: '/employeeCheck',
        component: resolve => require(['../components/page/employeeCheck.vue'], resolve) // Vue-Quill-Editor组件
      },

    ]
  },
  {
    path: '/login',
    component: resolve => require(['../components/page/Login.vue'], resolve)
},
]

const router = new VueRouter({
  routes
})

export default router
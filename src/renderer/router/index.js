import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'userinfo-page',
      component: require('@/components/UserInfoPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

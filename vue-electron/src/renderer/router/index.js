import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'markdown',
      component: require('@/components/markdown')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

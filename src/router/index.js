import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/pages/404'
import home from '@/pages/home'
import index from '@/pages/index'
import carousel from '@/pages/carousel'
import list from '@/pages/list'
import user from '@/pages/user'
import editor from '@/pages/editor'
import articles from '@/pages/articles'


Vue.use(Router)

export default new Router({
  mode: 'history',    //去掉router中的#号
  routes: [
    {
      path: '/',
      redirect: '/home/index'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [{
        path: 'index',
        name: 'index',
        component: index
      }, {
        path: 'carousel',
        name: 'carousel',
        component: carousel
      }, {
        path: 'list',
        component: list,
        name: 'list'
      }, {
        path: 'user',
        component: user,
        name: 'user'
      }, {
        path: 'editor',
        component: editor,
        name: 'editor'
      }, {
        path: 'articles',
        component: articles,
        name: 'articles'
      }, {
        path: 'none',
        component: NotFound,
        name: ''
      }]
    },
    {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    },
    {
      path: '*',
      redirect: '/404',
      hidden: true
    }
  ]
})

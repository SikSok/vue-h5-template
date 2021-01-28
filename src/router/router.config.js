/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index'),
    meta: {
      title: '场景选择',
      keepAlive: false
    }
  },
  {
    path: '/temperture',
    name: 'temperture',
    component: () => import('@/views/temperture'),
    meta: {
      title: '测温',
      keepAlive: false
    }
  },
  {
    path: '/pickup',
    name: 'pickup',
    component: () => import('@/views/pickup'),
    meta: {
      title: '家长接送',
      keepAlive: false
    }
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/setting'),
    meta: {
      title: '设置页',
      keepAlive: false
    }
  },
  {
    path: '/signIn',
    name: 'signIn',
    component: () => import('@/views/signIn'),
    meta: {
      title: '登入',
      keepAlive: false
    }
  }
]

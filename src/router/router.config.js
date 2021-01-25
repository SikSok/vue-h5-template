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
      title: 'key',
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

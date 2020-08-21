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
      title: '个人档案首页',
      keepAlive: false
    }
  },
  {
    path: '/basicInformation',
    name: 'basicInformation',
    component: () => import('@/views/edit/basicInformation'),
    meta: {
      title: '编辑-基本信息',
      keepAlive: false
    }
  },
  {
    path: '/familyEditPage',
    name: 'familyEditPage',
    component: () => import('@/views/edit/familyEditPage'),
    meta: {
      title: '编辑-家庭信息',
      keepAlive: false
    }
  }
]

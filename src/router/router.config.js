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
  },
  {
    path: '/educationEditPage',
    name: 'educationEditPage',
    component: () => import('@/views/edit/educationEditPage'),
    meta: {
      title: '编辑-教育背景',
      keepAlive: false
    }
  },
  {
    path: '/workExperienceEditPage',
    name: 'workExperienceEditPage',
    component: () => import('@/views/edit/workExperienceEditPage'),
    meta: {
      title: '编辑-工作经历',
      keepAlive: false
    }
  },
  {
    path: '/qualificationEditPage',
    name: 'qualificationEditPage',
    component: () => import('@/views/edit/qualificationEditPage'),
    meta: {
      title: '编辑-资质认证',
      keepAlive: false
    }
  }
]

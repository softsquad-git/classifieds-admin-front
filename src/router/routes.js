import ListCategories from 'components/admin/categories/ListCategories'
import StoreCategory from 'components/admin/categories/StoreCategory'
import AdminPage from 'components/admin/AdminPage'
import AdminLayout from 'layouts/AdminLayout'
import ListUsers from 'components/admin/users/ListUsers'
import ListClassifieds from 'components/admin/classifieds/ListClassifieds'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
    ]
  },
  {
    path: '/admin',
    component: AdminLayout,
    name: 'AdminLayout',
    children: [
      {
        path: '',
        component: AdminPage,
        name: 'AdminPage'
      },
      {
        path: 'categories',
        component: ListCategories,
        name: 'ListCategories'
      },
      {
        path: 'categories/store',
        component: StoreCategory,
        name: 'StoreCategory'
      },
      {
        path: 'users',
        component: ListUsers,
        name: 'ListUsers'
      },
      {
        path: 'classifieds',
        component: ListClassifieds,
        name: 'ListClassifieds'
      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

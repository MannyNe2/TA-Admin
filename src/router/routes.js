import auth from 'src/middlewares/auth.js';
import setSidebarItems from 'src/middlewares/set-sidebar-items.js';
import menuItems from 'assets/data/menus/main-sidebar.json';

const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  //   beforeEnter: [auth],
  // },
  {
    path: '/',
    component: () => import('layouts/SideBarLayout.vue'),
    children: [
      {
        path: '/',
        component: () => import('src/pages/home/IndexPage.vue'),
      },
      {
        path: 'providers',
        component: () => import('src/pages/home/ProvidersPage.vue'),
      },
      {
        path: 'routes',
        component: () => import('src/pages/home/RoutesPage.vue'),
      },
    ],
    beforeEnter: [auth, setSidebarItems(menuItems)],
  },
  {
    path: '/login',
    component: () => import('layouts/FullscreenLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

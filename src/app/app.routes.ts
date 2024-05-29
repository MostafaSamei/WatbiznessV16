// import { authGuard } from './core/guards/auth.guard';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/layouts/authed-layout/authed-layout.component').then(
        (m) => m.AuthedLayoutComponent
      ),

    children: [
      {
        path: '',
        loadComponent: () =>
          import('./components/pages/main-page/main-page.component').then(
            (m) => m.MainPageComponent
          ),
      },
      {
        path: 'users-management',
        loadComponent: () =>
          import(
            './components/pages/user-management/user-management.component'
          ).then((m) => m.UserManagementComponent),
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            loadComponent: () =>
              import('./components/ui/users-list/users-list.component').then(
                (m) => m.UsersListComponent
              ),
          },
          {
            path: 'permission',
            loadComponent: () =>
              import(
                './components/ui/users-permission/users-permission.component'
              ).then((m) => m.UsersPermissionComponent),
          },
        ],
      },
      {
        path: 'broadcast',
        loadComponent: () =>
          import('./components/pages/broadcast/broadcast.component').then(
            (m) => m.BroadcastComponent
          ),
        children: [
          {
            path: '',
            redirectTo: 'history',
            pathMatch: 'full',
          },
          {
            path: 'history',
            loadComponent: () =>
              import(
                './components/ui/broadcast-history/broadcast-history.component'
              ).then((m) => m.BroadcastHistoryComponent),
          },
          {
            path: 'chat',
            loadComponent: () =>
              import(
                './components/ui/broadcast-chat/broadcast-chat.component'
              ).then((m) => m.BroadcastChatComponent),
          },
          {
            path: 'Scheduled',
            loadComponent: () =>
              import(
                './components/ui/broadcast-history/broadcast-history.component'
              ).then((m) => m.BroadcastHistoryComponent),
          },
        ],
      },
      {
        path: 'contacts',
        loadComponent: () =>
          import('./components/pages/contacts/contacts.component').then(
            (m) => m.ContactsComponent
          ),
      },
    ],
  },
  {
    path: '',
    loadComponent: () =>
      import('./components/layouts/public-layout/public-layout.component').then(
        (m) => m.PublicLayoutComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./components/auth/login-page/login-page.component').then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: 'sign-up',
        loadComponent: () =>
          import('./components/auth/sign-up-page/sign-up-page.component').then(
            (m) => m.SignUpPageComponent
          ),
      },
    ],
  },
];

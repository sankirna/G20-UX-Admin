import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { QrCodeGeneratorComponent } from './shared/qr-code-generator/qr-code-generator.component';
import { QrCodeScannerComponent } from './shared/qr-code-scanner/qr-code-scanner.component';

const appRoutes: Routes = [
  { path: 'scanner', component: QrCodeScannerComponent },
  { path: 'generator', component: QrCodeGeneratorComponent },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'teams',
    loadChildren: () => import('./features/teams/teams.module').then(m => m.TeamsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ticketcategories',
    loadChildren: () => import('./features/ticket-categories/ticket-categories.module').then(m => m.TicketCategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'venues',
    loadChildren: () => import('./features/venues/venues.module').then(m => m.VenuesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren: () => import('./features/categories/categories.module').then(m => m.CategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subcategories',
    loadChildren: () => import('./features/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'coupons',
    loadChildren: () => import('./features/coupons/coupons.module').then(m => m.CouponsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profiles',
    loadChildren: () => import('./features/profiles/profiles.module').then(m => m.ProfilesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'countries',
    loadChildren: () => import('./features/masters/countries/countries.module').then(m => m.CountriesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'states',
    loadChildren: () => import('./features/masters/states/states.module').then(m => m.StatesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'cities',
    loadChildren: () => import('./features/masters/cities/cities.module').then(m => m.CitiesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'customers',
    loadChildren: () => import('./features/customers/customers.module').then(m => m.CustomersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'boarding-details',
    loadChildren: () => import('./features/boarding-details/boarding-details.module').then(m => m.BoardingDetailsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'email-accounts',
    loadChildren: () => import('./features/email-accounts/email-accounts.module').then(m => m.EmailAccountsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./features/account/account.module').then(m => m.AccountModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'icons',
    loadChildren: () => import('./features/icons/icons.module').then(m => m.IconsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'typography',
    loadChildren: () => import('./features/typography/typography.module').then(m => m.TypographyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    loadChildren: () => import('./features/about/about.module').then(m => m.AboutModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

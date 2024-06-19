import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { ProviderAdminDashboardComponent } from './admin/provider-admin-dashboard/provider-admin-dashboard.component';
import { ToolsComponent } from './admin/tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guard/auth.guard';
import { RoleEnum } from '@ace/shared';
import { rolesGuard } from './guard/roles.guard';
import { ServiceCreationFormComponent } from './provider-form/provider-form.component';
import { publicGuard } from './guard/public.guard';
import { ServiceDashboardComponent } from './service-dashboard/service-dashboard.component';
import { PropertyCreationComponent } from './property-creation/property-creation.component';
import { PropertyComponent } from './property/property.component';
import { BookingsComponent } from './bookings/bookings.component';
import { ServiceViewComponent } from './service-dashboard/service-view/service-view.component';
import { PaymentComponent } from './payment/payment.component';
import { MyPropertiesComponent } from './my-properties/my-properties.component';
import { PropertyAdminDashboardComponent } from './admin/property-admin-dashboard/property-admin-dashboard.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { ContactComponent } from './support/contact/contact.component';
import { SupportComponent } from './support/support.component';
import { TicketsComponent } from './support/tickets/tickets.component';
import { TicketViewComponent } from './support/tickets/ticket-view/ticket-view.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent, title: 'Home'},
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
    canActivate: [publicGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
    canActivate: [publicGuard],
  },
  {
    path: 'admin',
    canActivate: [authGuard, rolesGuard],
    data: { roles: [RoleEnum.ADMIN] },
    children: [
      { path: 'users', component: UsersComponent },
      { path: 'review', component: ReviewComponent },
      { path: 'property', component: PropertyAdminDashboardComponent },
      { path: 'provider', component: ProviderAdminDashboardComponent },
      { path: 'tools', component: ToolsComponent },
    ],
  },
  { path: 'service-creation', component: ServiceCreationFormComponent },
  { 
    path: 'provider',
    canActivate: [authGuard, rolesGuard],
    data: { roles: [RoleEnum.PROVIDER] },
    children: [
      { 
        path: 'my-services', 
        component: ServiceDashboardComponent,
      },
      {
        path: 'my-services/:id',
        component: ServiceViewComponent
      }
    ]
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
  },
  { path: 'my-properties', component: MyPropertiesComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.LESSOR] } },
  { path: 'property-creation', component: PropertyCreationComponent, canActivate: [authGuard] },
  { path: 'property/:id', component: PropertyComponent },
  { path: 'bookings', component: BookingsComponent, canActivate: [authGuard] },
  { path: 'payment', component: PaymentComponent, canActivate: [authGuard], children: [{ path: 'success', component: PaymentComponent }]},
  {
    path: 'support',
    canActivate: [authGuard],
    children: [
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'tickets',
        children: [
          {
            path: '',
            component: TicketsComponent,
          },
          {
            path: ':id',
            component: TicketViewComponent
          }
        ]
      },
      {
        path: '',
        component: SupportComponent,
      }
    ]
  },
  { path: '**', redirectTo: '' },
];

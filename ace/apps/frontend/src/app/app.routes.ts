import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationComponent } from './admin/location/location.component';
import { ProviderAdminDashboardComponent } from './admin/provider/provider.component';
import { ToolsComponent } from './admin/tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './components/upload/upload.component';
import { authGuard } from './guard/auth.guard';
import { RoleEnum } from '@ace/shared';
import { rolesGuard } from './guard/roles.guard';
import { ServiceCreationFormComponent } from './provider-form/provider-form.component';
import { publicGuard } from './guard/public.guard';
import { ServiceComponent } from './service/service.component';
import { PropertyCreationComponent } from './property-creation/property-creation.component';
import { PropertyComponent } from './property/property.component';

export const appRoutes: Route[] = [
  { path: '', component: HomeComponent },
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
      { path: 'location', component: LocationComponent },
      { path: 'provider', component: ProviderAdminDashboardComponent },
      { path: 'tools', component: ToolsComponent },
    ],
  },
  { path: 'serviceCreation', component: ServiceCreationFormComponent },
  { 
    path: 'provider',
    canActivate: [authGuard, rolesGuard],
    data: { roles: [RoleEnum.PROVIDER] },
    children: [
      { path: 'my-services', component: ServiceComponent }
    ]
  },
  { path: 'propertyCreation', component: PropertyCreationComponent, canActivate: [authGuard]},
  { path: 'property/:id', component: PropertyComponent },
  { path: '**', redirectTo: '' },
  // {
  //   path: 'renter',
  //   canActivate: [authGuard, rolesGuard],
  //   data: { roles: [RoleEnum.RENTER] },
  //   children: [
  //     { path: 'my-properties', component: }
  //   ]
  // }
];

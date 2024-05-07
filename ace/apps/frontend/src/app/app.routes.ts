import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationComponent } from './admin/location/location.component';
import { ProviderComponent } from './admin/provider/provider.component';
import { ToolsComponent } from './admin/tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './guard/auth.guard';
import { RoleEnum } from '@ace/shared';
import { rolesGuard } from './guard/roles.guard';

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'admin/users', component: UsersComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN]} },
    { path: 'admin/review', component: ReviewComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN]} },
    { path: 'admin/location', component: LocationComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN]} },
    { path: 'admin/provider', component: ProviderComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN]} },
    { path: 'admin/tools', component: ToolsComponent, canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN]} },
];

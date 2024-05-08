import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationComponent } from './admin/location/location.component';
import { ProviderComponent } from './admin/provider/provider.component';
import { ToolsComponent } from './admin/tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { authGuard } from './guard/auth.guard';
import { RoleEnum } from '@ace/shared';
import { rolesGuard } from './guard/roles.guard';
import { ProviderFormComponent } from "./providerForm/providerForm.component";

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { 
        path: 'admin', 
        canActivate: [authGuard, rolesGuard], data: { roles: [RoleEnum.ADMIN] },
        children: [
            { path: 'users', component: UsersComponent,  },
            { path: 'review', component: ReviewComponent },
            { path: 'location', component: LocationComponent },
            { path: 'provider', component: ProviderComponent },
            { path: 'tools', component: ToolsComponent }
        ]
    },
    { path: 'providerCreation', component: ProviderFormComponent }
];

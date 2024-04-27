import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationComponent } from './admin/location/location.component';
//import { ProviderComponent } from './admin/provider/provider.component';
import { ToolsComponent } from './admin/tools/tools.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
// import { ProviderComponent } from "./provider/provider.component";
import { authGuard } from './guard/auth.guard';
import { ProviderComponent } from "./provider/provider.component";

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: 'admin/users', component: UsersComponent, canActivate: [authGuard] },
    { path: 'admin/review', component: ReviewComponent, canActivate: [authGuard] },
    { path: 'admin/location', component: LocationComponent, canActivate: [authGuard] },
    { path: 'admin/provider', component: ProviderComponent, canActivate: [authGuard] },
    { path: 'admin/tools', component: ToolsComponent, canActivate: [authGuard] },
    { path: 'provider', component: ProviderComponent }
];
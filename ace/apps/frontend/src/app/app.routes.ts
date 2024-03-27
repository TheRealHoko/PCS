import { Route, withDebugTracing } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent}
];

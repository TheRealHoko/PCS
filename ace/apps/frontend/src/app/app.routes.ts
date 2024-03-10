import { Route, withDebugTracing } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
];

import { Route, withDebugTracing } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'adminPanel', component: AdminPanelComponent }
];

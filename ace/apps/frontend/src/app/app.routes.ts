import { Route, withDebugTracing } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ReviewComponent } from './admin/review/review.component';
import { UsersComponent } from './admin/users/users.component';
import { LocationComponent } from './admin/location/location.component';
import { ProviderComponent } from './admin/provider/provider.component';
import { ToolsComponent } from './admin/tools/tools.component';

export const appRoutes: Route[] = [
    { path: 'home', component: HomeComponent },
    { path: 'admin/users', component: UsersComponent},
    { path: 'admin/review', component: ReviewComponent},
    { path: 'admin/location', component: LocationComponent},
    { path: 'admin/provider', component: ProviderComponent},
    { path: 'admin/tools', component: ToolsComponent}
];

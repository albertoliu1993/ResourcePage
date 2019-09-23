import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResourcePageComponent } from './resource-page/resource-page.component';
import { HeaderComponent } from './header/header.component';


const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'resourcepage', component: ResourcePageComponent},
    {path: 'header', component: HeaderComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
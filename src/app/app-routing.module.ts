import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { EscortListComponent } from './page/escort-list/escort-list.component';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // <---- connected Route with guard
    children: [
      // { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'escort-list', component: EscortListComponent }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
},
{
  path: 'home',
  component: HomeComponent
},
{ path: '', 
component:  HomeComponent
}
,
  {
    path: '**',
    redirectTo: '/home',
    pathMatch: 'full'
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

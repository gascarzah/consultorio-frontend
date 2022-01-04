import { LayoutComponent } from './pages/layout/layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  // {
  //   path: 'login',
  //   component: LoginComponent
  // },
  // {
  //   path: 'recuperar', component: RecuperarComponent, children: [
  //     { path: ':token', component: TokenComponent }
  //   ]
  // },
  {
    path: 'pages',
    component: LayoutComponent,
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  // { path: 'not-404', component: Not404Component },
  {
    path: '**',
    redirectTo: 'not-404'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

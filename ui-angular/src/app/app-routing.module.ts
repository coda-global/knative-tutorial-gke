import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessagingComponent } from './messaging/messaging.component';

const routes: Routes = [
  {
    path: 'messaging',
    component: MessagingComponent,
    data: { title: 'GDG Demo - Messages' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'GDG Demo - Login' }
  },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

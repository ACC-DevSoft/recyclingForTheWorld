import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { ListPostComponent } from './post/list-post/list-post.component';
import { PostComponent } from './post/post/post.component';
import { ConnectComponent } from './connect/connect/connect.component';
import { StatisticComponent } from './statistic/statistic/statistic.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registerRole',
    component: RegisterRoleComponent,
  },
  {
    path: 'listRole',
    component: ListRoleComponent,
  },
  {
    path: 'addPost',
    component: AddPostComponent,
  },
  {
    path: 'userPosts',
    component: ListPostComponent,
  },
  {
    path: 'posts',
    component: PostComponent,
  },
  {
    path: 'connect',
    component: ConnectComponent,
  },
  {
    path: 'statistic',
    component: StatisticComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

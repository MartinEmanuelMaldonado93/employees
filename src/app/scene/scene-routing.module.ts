import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SceneComponent } from './scene.component';

const routes: Route[] = [
  {
    path: '',
    component: SceneComponent,
  },
  // {
  //   path:'/home',
  //   component: HomeComponent,
  // },
  // {
  //   path:'', pathMatch: 'full', redirectTo: '/home'
  // }
  // {
  //   path: '**',
  //   component: NotFoundPage
  // }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SceneRoutingModule {}

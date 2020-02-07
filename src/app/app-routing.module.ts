import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'by-name',
    loadChildren: () => import('./by-name/by-name.module').then( m => m.ByNamePageModule)
  },
  {
    path: 'by-dob',
    loadChildren: () => import('./by-dob/by-dob.module').then( m => m.ByDobPageModule)
  },
  {
    path: 'byphoto',
    loadChildren: () => import('./byphoto/byphoto.module').then( m => m.ByphotoPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

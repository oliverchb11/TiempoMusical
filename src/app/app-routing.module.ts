import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { HomePageModule } from './home/home.module';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    canActivate: [ AuthGuard]
  },
  {
    path: 'practicar',
    loadChildren: () => import('./pages/practicar/practicar.module').then( m => m.PracticarPageModule),
    canActivate: [ AuthGuard]
  },
  {
    path: 'estadisticas',
    loadChildren: () => import('./pages/estadisticas/estadisticas.module').then( m => m.EstadisticasPageModule),
    canActivate: [ AuthGuard]
  },
  { path: 'cerrar', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

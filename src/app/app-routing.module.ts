import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'listaExpedientes', 
    pathMatch: 'full'
  },
  {
    path: 'listaExpedientes',
    loadChildren: () => import('./expediente/expediente.module').then( m => m.ExpedientePageModule)
  },
  {
    path: 'expediente',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

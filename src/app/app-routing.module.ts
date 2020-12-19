import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './facturacion/factura/factura.component';
import { FacturaDetalleComponent } from './facturacion/factura-detalle/factura-detalle.component';


const routes: Routes = [
  { path: '', component: FacturaComponent  },
  {
    path: 'factura' ,
    loadChildren: () => import('./facturacion/facturacion.module').then(m => m.FacturacionModule)
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FacturaComponent } from './factura/factura.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';


const routes: Routes = [
  {
    path: '',
    component: FacturaComponent
  },
  {
    path: 'detalle',
    component: FacturaDetalleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FacturacionRoutingModule { }

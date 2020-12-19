import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturaComponent } from './factura/factura.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [FacturaComponent, FacturaDetalleComponent],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class FacturacionModule { }

platformBrowserDynamic().bootstrapModule(FacturacionModule)


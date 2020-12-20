import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturacionRoutingModule } from './facturacion-routing.module';
import { FacturaComponent } from './factura/factura.component';
import { FacturaDetalleComponent } from './factura-detalle/factura-detalle.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [FacturaComponent, FacturaDetalleComponent],
  imports: [
    CommonModule,
    FacturacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,MatDialogModule,MatButtonModule
  ],
})
export class FacturacionModule { }

platformBrowserDynamic().bootstrapModule(FacturacionModule)


import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../services/factura/factura.service';
import { FacturaModel } from '../models/FacturaModel';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  constructor(
    private _facturaService: FacturaService
    ) { }
  
  dataFacturas: FacturaModel[];
  

  ngOnInit(): void {
    this.CargarFacturas();
  }

  CargarFacturas(): void {
    this._facturaService
      .ListarFacturas()
      .subscribe((result: any) => {
        if (result.status) {
          this.dataFacturas = result.data;
        }
      });
  }

  ModalAgregarFactura(): void{

    
  }

  ModalEditarFactura(factura: FacturaModel): void{

    
  }

  EliminarFactura(cod: number): void{
    this._facturaService.EliminarFactura(cod).subscribe((result: any) =>{
      if(result.status){
        this.dataFacturas = this.dataFacturas.filter(f => f.cod != cod);
      }
    });
  }
}

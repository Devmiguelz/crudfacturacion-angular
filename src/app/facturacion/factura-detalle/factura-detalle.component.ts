import { Component,Inject, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente/cliente.service';
import { ProductoService } from '../services/producto/producto.service';
import { ClienteModel } from '../models/ClienteModel';
import { ProductoModel } from '../models/ProductoModel';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearFacturaRequest, ActualizarFacturaRequest } from '../request/ModelRequest';
import { HttpErrorResponse } from '@angular/common/http';
import { FacturaService } from '../services/factura/factura.service';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FacturaModel } from '../models/FacturaModel';
import { DetalleFacturaModel } from '../models/DetalleFacturaModel';
import { SwalertServiceService } from '../../utils/swalert-service.service';

@Component({
  selector: "app-factura-detalle",
  templateUrl: "./factura-detalle.component.html",
  styleUrls: ["./factura-detalle.component.css"],
})
export class FacturaDetalleComponent implements OnInit {

  dataClientes: ClienteModel[];
  dataProductos: ProductoModel[];
  dataProductoSeleccionado: ProductoModel;
  formFactura: FormGroup;
  formDetalleFactura: FormGroup;
  factura=null;
  ListaDetalleProductos: DetalleFacturaModel[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private _clienteService: ClienteService,
    private _productoService: ProductoService,
    private _facturaService:FacturaService,
    private _swalAlertService:SwalertServiceService
  ) {
    this.FormFactura();
    this.factura=data;
    this.cargarFacturaEditar(this.factura)
    this.FormDetalleFactura();
    this.CargarClientes();
    this.CargarProductos();
  }

  ngOnInit(): void {
   
  }

  FormFactura() :void{
    this.formFactura = this.formBuilder.group({
      cod: [0],
      fecha: [this.ObtenerFecha(), [Validators.required]],
      codcliente: [0, [Validators.required, this.primeraOpcionValidate]],
      subtotal: [0, [Validators.required]],
      iva: [0, [Validators.required]],
      total: [0, [Validators.required]]
    });
  }

  FormDetalleFactura() :void{
    this.formDetalleFactura = this.formBuilder.group({
      codproducto: [0, [Validators.required, this.primeraOpcionValidate]],
      cantidad: [1, [Validators.required]],
      precio: [0, [Validators.required]],
      subtotal: [0, [Validators.required]]
    });
  }
  cargarFacturaEditar(factura:FacturaModel){
    if (factura!=null) {
    this.ListaDetalleProductos=factura.detalle;
    this.formFactura.setValue({
      cod: factura.cod,
      fecha: factura.fecha,
      codcliente: factura.codcliente,
      subtotal: factura.subtotal,
      iva: factura.iva,
      total: factura.total
    })
    }
  }

  CargarProductos(): void {
    this._productoService
      .ListarProductos()
      .subscribe((result: ProductoModel[]) => {
          this.dataProductos = result;
      },(error:HttpErrorResponse)=>{
        this._swalAlertService.toastError(error.error,1500);
      });
  }

  CargarClientes(): void {
    this._clienteService
      .ListarClientes()
      .subscribe((result: ClienteModel[]) => {
        this.dataClientes = result;
      },(error:HttpErrorResponse)=>{
        this._swalAlertService.toastError(error.error,1500);
      });
  }

  ProductoChange(codproducto: number): void {
    if(codproducto != 0){
      this._productoService
        .BuscarProducto(codproducto)
        .subscribe((result: ProductoModel) => {
            this.dataProductoSeleccionado = result;
            this.formDetalleFactura.controls["precio"].setValue(this.dataProductoSeleccionado.precio);
            this.CalcularSubtotalDetalle(this.dataProductoSeleccionado.precio, this.formDetalleFactura.value.cantidad);
        },(error:HttpErrorResponse)=>{console.log(error)});
    }else{
      this.dataProductoSeleccionado = null;
      this.formDetalleFactura.controls["subtotal"].setValue(0);
      this.formDetalleFactura.controls["cantidad"].setValue(1);
    }
  }

  CantidadChange(cantidad: number): void{
    if(this.dataProductoSeleccionado != null){
      this.CalcularSubtotalDetalle(this.dataProductoSeleccionado.precio, cantidad);
    }
  }

  IvaChange(ivaporcentaje: number): void{
    if(ivaporcentaje > 0 && this.formFactura.value.subtotal > 0){
      let valorIva = this.formFactura.value.subtotal * (ivaporcentaje / 100);
      this.formFactura.controls["iva"].setValue(valorIva);
      this.formFactura.controls["total"].setValue(this.formFactura.value.total + valorIva);
    }else if(this.formFactura.value.iva > 0){
      this.formFactura.controls["iva"].setValue(0);
      this.formFactura.controls["total"].setValue(this.formFactura.value.subtotal);
    }
  }

  CalcularSubtotalDetalle(precio: number, cantidad: number): void{
    let subtotal = precio * cantidad;
    this.formDetalleFactura.controls["subtotal"].setValue(subtotal);
  }

  CalcularSubtotalFactura(): void{
    if(this.ListaDetalleProductos.length > 0){
      let subtotal = 0;
      this.ListaDetalleProductos.forEach(d => {
        subtotal += d.subtotal;
      });
      this.formFactura.controls["subtotal"].setValue(subtotal);
      this.formFactura.controls["total"].setValue(subtotal);
    }else{
      this.formFactura.controls["subtotal"].setValue(0);
      this.formFactura.controls["total"].setValue(0);
      this.formFactura.controls["iva"].setValue(0);
    }
  }

  ObtenerFecha(): string {
    let fechaDate = new Date();
    let dia = ("0" + fechaDate.getDate()).slice(-2);
    let mes = ("0" + (fechaDate.getMonth() + 1)).slice(-2);
    let fecha = fechaDate.getFullYear()+"-"+(mes)+"-"+(dia);
    return fecha;
  }

  AgregarProductoDetalle(): void{
    if(this.ListaDetalleProductos.length > 0){
      let detalleAgregado = this.ListaDetalleProductos
                                .find(d =>  d.codproducto == this.formDetalleFactura.value.codproducto);      
      if(detalleAgregado != undefined){
        let posicion = this.ListaDetalleProductos.indexOf(detalleAgregado);
        let totalCantidad = detalleAgregado.cantidad + this.formDetalleFactura.value.cantidad;
        if(this.dataProductoSeleccionado.cantidad >= totalCantidad){
          let subtotal = detalleAgregado.precio * totalCantidad;        
          this.ListaDetalleProductos[posicion].cantidad = totalCantidad;
          this.ListaDetalleProductos[posicion].subtotal = subtotal;
        }else{
          this._swalAlertService.toastError("Supera la cantidad del Stock",1500);
        } 
      }else{
        this.LlenarListaDetalle();
      }
    }else{
      this.LlenarListaDetalle();
    }
    this.CalcularSubtotalFactura();
  }

  LlenarListaDetalle(): void{
    if(this.dataProductoSeleccionado.cantidad >= this.formDetalleFactura.value.cantidad){
      this.ListaDetalleProductos.push(
        {
          cod: null,
          codproducto: this.formDetalleFactura.value.codproducto,
          producto: this.dataProductoSeleccionado.descripcion,
          subtotal: this.formDetalleFactura.value.subtotal,
          precio: this.formDetalleFactura.value.precio,
          cantidad: this.formDetalleFactura.value.cantidad,
        });
    }
  }

  EliminarProductoDetalle(posicion: number): void{
    this.ListaDetalleProductos.splice(posicion, 1);
    this.CalcularSubtotalFactura();
  }

  AgregarFactura(): void{
    let dataFactura: CrearFacturaRequest = {
      fecha: this.formFactura.value.fecha,
      subtotal: this.formFactura.value.subtotal,
      iva: this.formFactura.value.iva,
      total: this.formFactura.value.total,
      codcliente: this.formFactura.value.codcliente,
      detalle: this.ListaDetalleProductos.map((detalle: DetalleFacturaModel) => 
        { 
          return { 
                  codproducto: detalle.codproducto, 
                  subtotal: detalle.subtotal, 
                  cantidad: detalle.cantidad
                } 
        })
    }
    this._facturaService.CrearFactura(dataFactura).subscribe((result)=>{
      this.FormFactura();
      this.FormDetalleFactura();
      this.ListaDetalleProductos = [];
      this.dataProductoSeleccionado = null;
      this._swalAlertService.toastSuccess('Agregado correctamente',1500)

    },(error:HttpErrorResponse)=>{
      this._swalAlertService.toastError(error.error,1500);
    });
  }

  ActualizarFactura(): void{
    let dataFactura: ActualizarFacturaRequest = {
      cod: this.formFactura.value.cod,
      fecha: this.formFactura.value.fecha,
      subtotal: this.formFactura.value.subtotal,
      iva: this.formFactura.value.iva,
      total: this.formFactura.value.total,
      codcliente: this.formFactura.value.codcliente,
      detalle: this.ListaDetalleProductos.map((detalle: DetalleFacturaModel) => 
        { 
          return { 
                  cod: detalle.cod,
                  codproducto: detalle.codproducto, 
                  codfactura: this.formFactura.value.cod,
                  subtotal: detalle.subtotal, 
                  cantidad: detalle.cantidad
                } 
        })
    }
    this._facturaService.ActualizarFactura(dataFactura).subscribe((result)=>{
      this.FormFactura();
      this.FormDetalleFactura();
      this.ListaDetalleProductos = [];
      this.dataProductoSeleccionado = null;
      this._swalAlertService.toastSuccess('Actualizado correctamente',1500)

      console.log(dataFactura);
    },(error:HttpErrorResponse)=>{
      this._swalAlertService.toastError(error.error,1500)

    })
   
  }

  ValidarControl(control: string, formulario: FormGroup){
    return formulario.get(control).invalid && (formulario.get(control).dirty || formulario.get(control).touched);
  }

  primeraOpcionValidate(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== undefined && control.value == 0) {
      return { 'primeraOpcion': true };
    }
    return null;
  }

}

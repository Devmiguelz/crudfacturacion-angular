import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { ProductoModel } from '../../models/ProductoModel';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }

  BuscarProducto(cod: number) {
    const url = environment.URL_API + '/api/Producto/Buscar/' + cod;
    return this.http.get(url);
  }

  ListarProductos() {
    const url = environment.URL_API + '/api/Producto/Listar';
    return this.http.get(url);
  }

}

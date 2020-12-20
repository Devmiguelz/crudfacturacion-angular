import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CrearFacturaRequest, ActualizarFacturaRequest } from '../../request/ModelRequest';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http: HttpClient) { }

  BuscarFactura(cod: number) {
    const url = environment.URL_API + '/api/Factura/Buscar/' + cod;
    return this.http.get(url);
  }

  ListarFacturas() {
    const url = environment.URL_API + '/api/Factura/Listar';
    return this.http.get(url);
  }

  CrearFactura(factura: CrearFacturaRequest) {
    const url = environment.URL_API + '/api/Factura/Crear';

    let headers:HttpHeaders = new HttpHeaders({ Accept: "application/x-www-form-urlencoded" });

    return this.http.post(url, factura, { headers });
  }

  ActualizarFactura(factura: ActualizarFacturaRequest) {
    const url = environment.URL_API + '/api/Factura/Actualizar';

    let headers:HttpHeaders = new HttpHeaders({ Accept: "application/x-www-form-urlencoded" });
    
    return this.http.post(url, factura, { headers });
  }
  
  EliminarFactura(cod: number) {
    
    const headers:HttpHeaders = new HttpHeaders({ Accept: "application/x-www-form-urlencoded" });

    const url = environment.URL_API + '/api/Factura/Eliminar';
    return this.http.post(url, { cod }, { headers });
  }
}

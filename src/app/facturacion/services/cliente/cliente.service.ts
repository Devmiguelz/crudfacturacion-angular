import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  ListarClientes() {
    const url = environment.URL_API + '/api/Cliente/Listar';
    return this.http.get(url);
  }
}

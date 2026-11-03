import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Veiculo } from '../pages/models/veiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService {

  private readonly API = 'http://localhost:3000/veiculos';

  constructor(private http: HttpClient) { }

  listar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.API);
  }

  incluir(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.API, veiculo);
  }

  alterar(veiculo: Veiculo): Observable<Veiculo> {
    return this.http.put<Veiculo>(`${this.API}/${veiculo.id}`, veiculo);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
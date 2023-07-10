import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  public contexto = 'http://localhost:8000/msvc-liga/resultado/api';

  constructor(private http: HttpClient) {}

  registrar_resultado(request: any): Observable<any> {
    return this.http.post(this.contexto + '/registrar-resultado', request);
  }

  consultar_resultados(): Observable<any> {
    return this.http.get(this.contexto + '/consultar-resultados');
  }
}

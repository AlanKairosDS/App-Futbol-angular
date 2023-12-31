import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ResultadosService {
  constructor(private http: HttpClient) {}

  registrar_resultado(request: any): Observable<any> {
    return this.http.post(environment.url_Liga + '/msvc-liga/resultado/api/registrar-resultado', request);
  }

  consultar_goles(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/goles-asistencias/api/consultar-goles');
  }

  consultar_tarjetas(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/tarjetas/api/consultar-tarjetas');
  }

  consultar_mvp(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/mvp/api/consultar-mvp');
  }

  consultar_resultados(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/resultado/api/consultar-resultados');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartidosService {
  constructor(private http: HttpClient) {}

  registrar_partido(request: any): Observable<any> {
    return this.http.post(environment.url_Liga + '/msvc-liga/partido/api/registrar-partido', request);
  }

  actualizar_partido(request: any, id: String): Observable<any> {
    return this.http.put(environment.url_Liga + '/msvc-liga/partido/api/actualizar-partido/' + id, request);
  }

  eliminar_partido(id: String): Observable<any> {
    return this.http.delete(environment.url_Liga + '/msvc-liga/partido/api/eliminar-partido/' + id);
  }

  consultar_partidos(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/partido/api/consultar-partidos');
  }

  consultar_partidos_jornada(jornada: String): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/partido/api/consultar-partido-jornada/' + jornada);
  }

  consultar_partidos_fecha(fecha: String): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/partido/api/consultar-partido-fecha/' + fecha);
  }
}

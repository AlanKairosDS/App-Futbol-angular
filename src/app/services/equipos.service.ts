import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EquiposService {
  constructor(private http: HttpClient) {}

  insertar_equipo(request: any): Observable<any> {
    return this.http.post(environment.url_Liga + '/msvc-liga/equipo/api/registrar-equipo', request);
  }

  actualizar_equipo(request: any, id: String): Observable<any> {
    return this.http.put(environment.url_Liga + '/msvc-liga/equipo/api/actualizar-equipo/' + id, request);
  }

  eliminar_equipo(id: String): Observable<any> {
    return this.http.delete(environment.url_Liga + '/msvc-liga/equipo/api/eliminar-equipo/' + id);
  }

  consultar_equipo(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/equipo/api/consultar-equipos');
  }

  insertar_futbolista_equipo(idEquipo: String, idFutbolista: String): Observable<any> {
    return this.http.get(
      environment.url_Liga + '/msvc-liga/equipo/api/insertar-futbolista/' + idEquipo + '/' + idFutbolista
    );
  }
}

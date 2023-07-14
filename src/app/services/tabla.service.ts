import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TablaService {
  constructor(private http: HttpClient) {}

  nueva_tabla(request: any): Observable<any> {
    return this.http.post(environment.url_Liga + '/msvc-liga/tabla-general/api/nueva-tabla', request);
  }

  registrar_equipo(idTabla: String, idEquipo: String): Observable<any> {
    return this.http.get(
      environment.url_Liga + '/msvc-liga/tabla-general/api/registrar-equipo/' + idTabla + '/' + idEquipo
    );
  }

  consultar_tablas(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/tabla-general/api/consultar-tabla');
  }

  consultar_tabla_id(id: String): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/tabla-general/api/consultar-tabla/' + id);
  }
}

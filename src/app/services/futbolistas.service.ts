import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FutbolistasService {
  constructor(private http: HttpClient) {}

  insertar_futbolista(request: any): Observable<any> {
    return this.http.post(environment.url_Liga + '/msvc-liga/futbolista/api/registrar-futbolista', request);
  }

  actualizar_futbolista(request: any, id: String): Observable<any> {
    return this.http.put(environment.url_Liga + '/msvc-liga/futbolista/api/actualizar-futbolista/' + id, request);
  }

  eliminar_futbolista(id: String): Observable<any> {
    return this.http.delete(environment.url_Liga + '/msvc-liga/futbolista/api/eliminar-futbolista/' + id);
  }

  consultar_futbolista(): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/futbolista/api/consultar-futbolistas');
  }

  consultar_futbolista_id(id: String): Observable<any> {
    return this.http.get(environment.url_Liga + '/msvc-liga/futbolista/api/consultar-futbolista/' + id);
  }
}

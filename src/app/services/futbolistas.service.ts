import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FutbolistasService {
  constructor(private http: HttpClient) {}

  insertar_futbolista(request: any): Observable<any> {
    return this.http.post('http://localhost:8000/msvc-liga/futbolista/api/registrar-futbolista', request);
  }

  actualizar_futbolista(request: any, id: String): Observable<any> {
    return this.http.put('http://localhost:8000/msvc-liga/futbolista/api/actualizar-futbolista/' + id, request);
  }

  eliminar_futbolista(id: String): Observable<any> {
    return this.http.delete('http://localhost:8000/msvc-liga/futbolista/api/eliminar-futbolista/' + id);
  }

  consultar_futbolista(): Observable<any> {
    return this.http.get('http://localhost:8000/msvc-liga/futbolista/api/consultar-futbolistas');
  }

  consultar_futbolista_id(id: String): Observable<any> {
    return this.http.get('http://localhost:8000/msvc-liga/futbolista/api/consultar-futbolista/' + id);
  }
}

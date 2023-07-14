import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LigasService {
  public ctxVaronil = environment.url_Liga + '/msvc-liga/liga-varonil/api';
  public ctxFemenil = environment.url_Liga + '/msvc-liga/liga-femenil/api';

  constructor(private http: HttpClient) {}

  validarContexto(liga: string): string {
    if (liga === 'Varonil') {
      return this.ctxVaronil;
    } else {
      return this.ctxFemenil;
    }
  }

  nueva_liga(liga: string, request: any): Observable<any> {
    return this.http.post(this.validarContexto(liga) + '/nueva-liga', request);
  }

  consultar_liga(liga: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/consultar-ligas');
  }

  agregar_equipo_liga(liga: string, idLiga: string, idEquipo: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-equipo-liga/' + idLiga + '/' + idEquipo);
  }

  agregar_partido_liga(liga: string, idLiga: string, idPartido: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-partido-liga/' + idLiga + '/' + idPartido);
  }

  agregar_tabla_liga(liga: string, idLiga: string, idTabla: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-tabla-liga/' + idLiga + '/' + idTabla);
  }

  agregar_resultado_liga(liga: string, idLiga: string, idResultado: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-resultado-liga/' + idLiga + '/' + idResultado);
  }

  agregar_goles_liga(liga: string, idLiga: string, idGoles: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-goles-liga/' + idLiga + '/' + idGoles);
  }

  agregar_tarjetas_liga(liga: string, idLiga: string, idTarjetas: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-tarjetas-liga/' + idLiga + '/' + idTarjetas);
  }

  agregar_mvp_liga(liga: string, idLiga: string, idMvp: string): Observable<any> {
    return this.http.get(this.validarContexto(liga) + '/agregar-mvp-liga/' + idLiga + '/' + idMvp);
  }
}

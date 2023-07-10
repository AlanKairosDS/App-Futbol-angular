import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PartidosService } from 'src/app/services/partidos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VaronilComponent {
  public contexto = 'http://localhost:8000/msvc-liga/liga-varonil/api';

  constructor(
    private equipoService: EquiposService,
    private partidoService: PartidosService,
    private resultadoService: ResultadosService,
    private dialog: MatDialog,
    private http: HttpClient
  ) {}

  agregar_equipos(idLiga: string, idEquipo: string): Observable<any> {
    return this.http.get(
      this.contexto + '/agregar-equipo-liga/' + idLiga + '/' + idEquipo
    );
  }

  consultar_ligas(): Observable<any> {
    return this.http.get(this.contexto + '/consultar-ligas');
  }
}

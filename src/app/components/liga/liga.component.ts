import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartidosService } from 'src/app/services/partidos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { LigasService } from 'src/app/services/ligas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.scss'],
})
export class LigaComponent {
  //Validar seccion de administracion que se mostrara
  public varonil: boolean | undefined;
  public femenil: boolean | undefined;
  //Variables para seccion de liga varonil
  public nuevaLigaVaronil: boolean | undefined;
  public consultarLigaVaronil: boolean | undefined;
  public equiposLigaVaronil: boolean | undefined;
  public partidosLigaVaronil: boolean | undefined;
  public tablaLigaVaronil: boolean | undefined;
  public resultadosLigaVaronil: boolean | undefined;
  public estadisticasLigaVaronil: boolean | undefined;
  //Variables para seccion de liga femenil
  public nuevaLigaFemenil: boolean | undefined;
  public consultarLigaFemenil: boolean | undefined;
  public equiposLigaFemenil: boolean | undefined;
  public partidosLigaFemenil: boolean | undefined;
  public tablaLigaFemenil: boolean | undefined;
  public resultadosLigaFemenil: boolean | undefined;
  public estadisticasLigaFemenil: boolean | undefined;

  constructor(
    public equipoService: EquiposService,
    public partidoService: PartidosService,
    public resultadoService: ResultadosService,
    public dialog: MatDialog
  ) {}

  varonilFront(): void {
    this.varonil = true;
    this.femenil = false;
  }

  femenilFront(): void {
    this.varonil = false;
    this.femenil = true;
  }

  principalFront(): void {
    this.varonil = undefined;
    this.femenil = undefined;
  }
}

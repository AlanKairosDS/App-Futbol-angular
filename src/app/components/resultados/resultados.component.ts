import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TablaService } from 'src/app/services/tabla.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface SelectTabla {
  nombre: string;
}

export interface DataPartidos {
  jornada: number;
  fecha: string;
  hora: number;
  equipoLocal: string;
  equipoVisitante: string;
}

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent {
  //Mensajes que se mostraran en modal
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public consultarTablaSuccess = 'Se realiza la consulta de tablas de forma correcta.';
  public consultarTablaError = 'Ocurrio un problema al consultar tablas. Favor de intentar nuevamente.';
  public consultarPartidoSuccess = 'Se realiza la consulta de partidos de forma correcta.';
  public consultarPartidoError = 'Ocurrio un problema al consultar partidos. Favor de intentar nuevamente.';
  public registrarSuccess = 'Se registro el resultado de forma correcta.';
  public registrarError = 'Ocurrio un problema al registrar resultado. Favor de intentar nuevamente.';
  public consultarSuccess = 'Se consultaron los resultados de forma correcta.';
  public consultarError = 'Ocurrio un problema al consultar resultados. Favor de intentar nuevamente.';
  //Validar seccion de administracion que se mostrara
  public registrar: boolean | undefined;
  //Variables para tablas
  public dataTablas: any | undefined;
  public dataSelectTablas: any | undefined;
  FormTabla = this.formBuilder.group({
    infoTabla: [{ value: '', disabled: true }, Validators.required],
  });
  //Variables para partidos
  public dataPartido: any | undefined;
  public dataSelectPartido: any | undefined;
  FormPartido = this.formBuilder.group({
    equipoLocal: [{ value: '', disabled: true }, Validators.required],
    equipoVisita: [{ value: '', disabled: true }, Validators.required],
  });
  //Variables para resultado
  public dataResultado: any | undefined;
  FormResultado = this.formBuilder.group({
    marcadorLocal: ['', Validators.required],
    marcadorVisita: ['', Validators.required],
    ganador: ['', Validators.required],
  });
  //Variables para estadisticas
  public botonNuevo = false;
  public botonContinuar = false;
  public botonSiguiente = true;
  public idFutbolista: string | undefined;
  public goles: string | undefined;
  public asistencias: string | undefined;
  public amarillas: string | undefined;
  public rojas: string | undefined;
  public mvp: string | undefined;
  public estadisticas: Array<any> = [];
  FormEstadisticas = this.formBuilder.group({
    infoEstad: [''],
  });

  //Funciones para mostrar tabla con tablas generales
  public columnsTabla = [
    {
      columnDef: 'nombre',
      header: 'Nombre Tabla',
      cell: (elementTabla: SelectTabla) => `${elementTabla.nombre}`,
    },
  ];
  public displayedColumnsTabla = this.columnsTabla.map((c) => c.columnDef);

  //Funciones para mostrar tabla de partidos
  public columnsPartido = [
    {
      columnDef: 'equipoLocal',
      header: 'Equipo Local',
      cell: (elementTabla: DataPartidos) => `${elementTabla.equipoLocal}`,
    },
    {
      columnDef: 'equipoVisitante',
      header: 'Equipo Visitante',
      cell: (elementTabla: DataPartidos) => `${elementTabla.equipoVisitante}`,
    },
    {
      columnDef: 'jornada',
      header: 'Jornada',
      cell: (elementTabla: DataPartidos) => `${elementTabla.jornada}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (elementTabla: DataPartidos) => `${elementTabla.fecha}`,
    },
    {
      columnDef: 'hora',
      header: 'Hora',
      cell: (elementTabla: DataPartidos) => `${elementTabla.hora}`,
    },
  ];
  public displayColumnsPartido = this.columnsPartido.map((c) => c.columnDef);

  constructor(
    public tablaService: TablaService,
    public partidoService: PartidosService,
    public resultadoService: ResultadosService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
    this.consultarTabla();
    this.consultarPartido();
  }

  principalFront(): void {
    this.registrar = undefined;
    this.FormTabla.reset();
    this.FormPartido.reset();
  }

  registrarFront(): void {
    this.registrar = true;
  }

  consultarTabla(): void {
    this.tablaService.consultar_tablas().subscribe({
      next: (data) => {
        this.dataTablas = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  selectRowTabla(select: any): void {
    this.dataSelectTablas = select;
    this.FormTabla.setValue({ infoTabla: select.nombre });
  }

  consultarPartido(): void {
    this.partidoService.consultar_partidos().subscribe({
      next: (data) => {
        this.dataPartido = this.armarPartidos(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  selectRowPartido(select: any): void {
    this.dataSelectPartido = select;
    this.FormPartido.setValue({ equipoLocal: select.equipoLocal, equipoVisita: select.equipoVisitante });
  }

  armarPartidos(data: any) {
    let partidos: {
      id: string;
      jornada: number;
      fecha: string;
      hora: number;
      idEquipoLocal: string;
      equipoLocal: string;
      idEquipoVisitante: string;
      equipoVisitante: string;
    }[] = [];

    data.forEach(
      (element: {
        id: any;
        jornada: any;
        fecha: any;
        hora: any;
        equipoLocal: { id: any; nombre: any };
        equipoVisitante: { id: any; nombre: any };
      }) => {
        let json = {
          id: element.id,
          jornada: element.jornada,
          fecha: element.fecha,
          hora: element.hora,
          idEquipoLocal: element.equipoLocal.id,
          equipoLocal: element.equipoLocal.nombre,
          idEquipoVisitante: element.equipoVisitante.id,
          equipoVisitante: element.equipoVisitante.nombre,
        };

        partidos.push(json);
      }
    );

    return partidos;
  }

  ingresaNuevaEstadistica(): void {
    if (
      this.idFutbolista !== undefined &&
      this.idFutbolista !== '' &&
      this.goles !== undefined &&
      this.goles !== '' &&
      this.asistencias !== undefined &&
      this.asistencias !== '' &&
      this.amarillas !== undefined &&
      this.amarillas !== '' &&
      this.rojas !== undefined &&
      this.rojas !== '' &&
      this.mvp !== undefined &&
      this.mvp !== ''
    ) {
      let jsonEstad = {
        idFutbolista: this.idFutbolista,
        goles: this.goles,
        asistencias: this.asistencias,
        amarillas: this.amarillas,
        rojas: this.rojas,
        mvp: this.mvp === '1' ? true : false,
      };

      this.estadisticas.push(jsonEstad);

      this.idFutbolista = undefined;
      this.goles = undefined;
      this.asistencias = undefined;
      this.amarillas = undefined;
      this.rojas = undefined;
      this.mvp = undefined;

      console.log(this.estadisticas);
    } else {
      let dialogInsertarError = this.dialog.open(DialogComponent);
      dialogInsertarError.componentInstance.header = this.headerError;
      dialogInsertarError.componentInstance.message =
        'Alguno de los datos no es valido, favor de revisar e intentar nuevamente.';
    }
  }

  registrarEstadisticas(): void {
    if (
      this.idFutbolista !== undefined &&
      this.idFutbolista !== '' &&
      this.goles !== undefined &&
      this.goles !== '' &&
      this.asistencias !== undefined &&
      this.asistencias !== '' &&
      this.amarillas !== undefined &&
      this.amarillas !== '' &&
      this.rojas !== undefined &&
      this.rojas !== '' &&
      this.mvp !== undefined &&
      this.mvp !== ''
    ) {
      let jsonEstad = {
        idFutbolista: this.idFutbolista,
        goles: this.goles,
        asistencias: this.asistencias,
        amarillas: this.amarillas,
        rojas: this.rojas,
        mvp: this.mvp === '1' ? true : false,
      };

      this.estadisticas.push(jsonEstad);

      this.botonNuevo = true;
      this.botonContinuar = true;
      this.botonSiguiente = false;

      console.log(this.estadisticas);
    } else {
      let dialogInsertarError = this.dialog.open(DialogComponent);
      dialogInsertarError.componentInstance.header = this.headerError;
      dialogInsertarError.componentInstance.message =
        'Alguno de los datos no es valido, favor de revisar e intentar nuevamente.';
    }
  }

  registrarResultado(): void {
    let jsonResultado = {
      partido: this.dataSelectPartido.id,
      jornada: this.dataSelectPartido.jornada,
      marcadorLocal: this.FormResultado.get('marcadorLocal')?.value,
      marcadorVisita: this.FormResultado.get('marcadorVisita')?.value,
      idTablaEquipoLocal: this.dataSelectTablas.id,
      idTablaEquipoVisita: this.dataSelectTablas.id,
      ganador: this.FormResultado.get('ganador')?.value,
      estadisticas: this.estadisticas,
    };

    this.resultadoService.registrar_resultado(jsonResultado).subscribe({
      next: () => {
        let dialogInsertarSuccess = this.dialog.open(DialogComponent);
        dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
        dialogInsertarSuccess.componentInstance.message = this.registrarSuccess;

        dialogInsertarSuccess.afterClosed().subscribe(() => {
          this.FormTabla.reset();
          this.FormPartido.reset();
          this.FormResultado.reset();
          this.FormEstadisticas.reset();
          this.idFutbolista = undefined;
          this.goles = undefined;
          this.asistencias = undefined;
          this.amarillas = undefined;
          this.rojas = undefined;
          this.mvp = undefined;
          this.estadisticas = [];
          this.registrar = undefined;
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        let dialogInsertarError = this.dialog.open(DialogComponent);
        dialogInsertarError.componentInstance.header = this.headerError;
        dialogInsertarError.componentInstance.message = this.registrarError;
      },
    });
  }
}

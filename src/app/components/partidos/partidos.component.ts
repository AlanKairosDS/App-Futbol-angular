import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PartidosService } from 'src/app/services/partidos.service';
import { EquiposService } from 'src/app/services/equipos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

//Interfaz para trabajar tabla de partidos
export interface DataPartidos {
  jornada: number;
  fecha: string;
  hora: number;
  equipoLocal: string;
  equipoVisitante: string;
}

//Interfaz para trabajar tabla de equipos
export interface DataEquipo {
  nombre: string;
}

@Component({
  selector: 'app-partidos',
  templateUrl: './partidos.component.html',
  styleUrls: ['./partidos.component.scss'],
})
export class PartidosComponent {
  //Mensajes que se mostraran en modal
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public insertarSuccess = 'Se registro el partido de forma correcta.';
  public insertarError = 'Ocurrio un problema al registrar partido. Favor de intentar nuevamente.';
  public actualizarSuccess = 'Se actualizo el partido de forma correcta.';
  public actualizarError = 'Ocurrio un problema al actualizar partido. Favor de intentar nuevamente.';
  public eliminarSuccess = 'Se elimina el partido de forma correcta.';
  public eliminarError = 'Ocurrio un problema al eliminar partido. Favor de intentar nuevamente.';
  public consultarSuccess = 'Se realiza la consulta de partidos de forma correcta.';
  public consultarError = 'Ocurrio un problema al consultar partidos. Favor de intentar nuevamente.';
  public consultarEquiposSuccess = 'Se realiza la consulta de equipos de forma correcta.';
  public consultarEquiposError = 'Ocurrio un problema al consultar equipos. Favor de intentar nuevamente.';

  //Validar front que se mostrar
  public registrar: boolean | undefined;
  public consultar: boolean | undefined;
  //Campos de formulario
  public equipoLocal = new FormControl('', [Validators.required]);
  public equipoVisita = new FormControl('', [Validators.required]);
  public jornada = new FormControl('', [Validators.required]);
  public fecha = new FormControl('', [Validators.required]);
  public hora = new FormControl('', [Validators.required]);
  //Variables para tablas de crud
  public dataPartido: any | undefined;
  public dataSelectPartido: any | undefined;
  //Variables para tablas de registrar
  public nombreEquipoLocal = new FormControl('', [Validators.required]);
  public nombreEquipoVisita = new FormControl('', [Validators.required]);
  public dataEquipoLocal: any | undefined;
  public dataEquipoVisita: any | undefined;
  public dataSelectEquipoLocal: any | undefined;
  public dataSelectEquipoVisita: any | undefined;

  //Funciones para mostrar tabla de Equipos
  public columnsEquipoLocal = [
    {
      columnDef: 'nombre',
      header: 'Equipo Local',
      cell: (elementEquipo: DataEquipo) => `${elementEquipo.nombre}`,
    },
  ];
  public displayedColumnsEquipoLocal = this.columnsEquipoLocal.map((c) => c.columnDef);

  public columnsEquipoVisita = [
    {
      columnDef: 'nombre',
      header: 'Equipo Visitante',
      cell: (elementEquipo: DataEquipo) => `${elementEquipo.nombre}`,
    },
  ];
  public displayedColumnsEquipoVisita = this.columnsEquipoVisita.map((c) => c.columnDef);

  //Funciones para mostrar tabla de Partidos
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

  //Constructor de clase
  constructor(public equipoService: EquiposService, public partidoService: PartidosService, public dialog: MatDialog) {}

  //Funcion para crear formulario y realizar validaciones
  public newForm = new FormGroup({
    equipoLocal: this.equipoLocal,
    equipoVisita: this.equipoVisita,
    jornada: this.jornada,
    fecha: this.fecha,
    hora: this.hora,
  });

  public newForm2 = new FormGroup({
    nombreEquipoLocal: this.nombreEquipoLocal,
    nombreEquipoVisita: this.nombreEquipoVisita,
    jornada: this.jornada,
    fecha: this.fecha,
    hora: this.hora,
  });

  //Funcion para validar que exista un valor para el campo equipoLocal
  getErrorLocal() {
    if (this.equipoLocal.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorEquipoLocal() {
    if (this.nombreEquipoLocal.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para validar que exista un valor para el campo equipoVisita
  getErrorVisita() {
    if (this.equipoVisita.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorEquipoVisita() {
    if (this.nombreEquipoVisita.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para validar que exista un valor para el campo jornada
  getErrorJornada() {
    if (this.jornada.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para validar que exista un valor para el campo fecha
  getErrorFecha() {
    if (this.fecha.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para validar que exista un valor para el campo hora
  getErrorHora() {
    if (this.hora.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para mostrar el front principal para seleccionar actividad a realizar
  frontPrincipal(): void {
    this.registrar = undefined;
    this.consultar = undefined;
  }

  //Funcion para mostrar el front donde se registraran los partidos
  frontRegistrar(): void {
    this.registrar = true;
    this.consultar = false;
  }

  //Funcion para mostrar el front donde se consultaran, actualizaran y eliminaran partidos
  frontConsultar(): void {
    this.registrar = false;
    this.consultar = true;
  }

  //Funcion para limpiar formulario en front de registro
  limpiarSeleccion(): void {
    this.nombreEquipoLocal.reset();
    this.nombreEquipoVisita.reset();
    this.jornada.reset();
    this.fecha.reset();
    this.hora.reset();
    this.dataEquipoLocal = undefined;
    this.dataSelectEquipoLocal = undefined;
    this.dataEquipoVisita = undefined;
    this.dataSelectEquipoVisita = undefined;
  }

  //Funcion para seleccionar campo de tabla y asignarlo a campos de formulario de registro
  selectRowEquipoLocal(select: any): void {
    this.dataSelectEquipoLocal = select;
    this.nombreEquipoLocal.setValue(select.nombre);
  }

  //Funcion para seleccionar campo de tabla y asignarlo a campos de formulario de registro
  selectRowEquipoVisita(select: any): void {
    this.dataSelectEquipoVisita = select;
    this.nombreEquipoVisita.setValue(select.nombre);
  }

  //Funcion para limpiar formulario en front de consulta
  limpiarCamposConsulta(): void {
    this.equipoLocal.reset();
    this.equipoVisita.reset();
    this.jornada.reset();
    this.fecha.reset();
    this.hora.reset();
    this.dataPartido = undefined;
    this.dataSelectPartido = undefined;
  }

  //Funcion para seleccionar campo de tabla y asignarlo a campos de formulario de consulta
  selectRowConsulta(select: any): void {
    console.log(select);
    this.dataSelectPartido = select;
    this.equipoLocal.setValue(select.equipoLocal);
    this.equipoVisita.setValue(select.equipoVisitante);
    this.jornada.setValue(select.jornada);
    this.fecha.setValue(select.fecha);
    this.hora.setValue(select.hora);
  }

  //Funcion para consultar equipos locales
  consultarEquipoLocal(): void {
    this.equipoService.consultar_equipo().subscribe({
      next: (data) => {
        this.dataEquipoLocal = data.data;
        let dialogConsultarSuccess = this.dialog.open(DialogComponent);
        dialogConsultarSuccess.componentInstance.header = this.headerSuccess;
        dialogConsultarSuccess.componentInstance.message = this.consultarEquiposSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogConsultarError = this.dialog.open(DialogComponent);
        dialogConsultarError.componentInstance.header = this.headerError;
        dialogConsultarError.componentInstance.message = this.consultarEquiposError;
      },
    });
  }

  //Funcion para consultar equipos visitantes
  consultarEquipoVisita(): void {
    this.equipoService.consultar_equipo().subscribe({
      next: (data) => {
        this.dataEquipoVisita = data.data;
        let dialogConsultarSuccess = this.dialog.open(DialogComponent);
        dialogConsultarSuccess.componentInstance.header = this.headerSuccess;
        dialogConsultarSuccess.componentInstance.message = this.consultarEquiposSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogConsultarError = this.dialog.open(DialogComponent);
        dialogConsultarError.componentInstance.header = this.headerError;
        dialogConsultarError.componentInstance.message = this.consultarEquiposError;
      },
    });
  }

  //Funcion para registrar partidos
  registrarPartido(): void {
    this.partidoService
      .registrar_partido({
        jornada: this.jornada.value,
        fechaPartido: this.fecha.value,
        hora: this.hora.value,
        idEquipoLocal: this.dataSelectEquipoLocal.id,
        idEquipoVisitante: this.dataSelectEquipoVisita.id,
      })
      .subscribe({
        next: (data) => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message = this.insertarSuccess;
        },
        error: (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.insertarError;
        },
      });
  }

  //Funcion apra actualizar partidos
  actualizarPartido(): void {
    this.partidoService
      .actualizar_partido(
        {
          jornada: this.jornada.value,
          fechaPartido: this.fecha.value,
          hora: this.hora.value,
          idEquipoLocal: this.dataSelectPartido.idEquipoLocal,
          idEquipoVisitante: this.dataSelectPartido.idEquipoVisitante,
        },
        this.dataSelectPartido.id
      )
      .subscribe({
        next: (data) => {
          let dialogActualizarSuccess = this.dialog.open(DialogComponent);
          dialogActualizarSuccess.componentInstance.header = this.headerSuccess;
          dialogActualizarSuccess.componentInstance.message = this.actualizarSuccess;
        },
        error: (err: HttpErrorResponse) => {
          let dialogActualizarError = this.dialog.open(DialogComponent);
          dialogActualizarError.componentInstance.header = this.headerError;
          dialogActualizarError.componentInstance.message = this.actualizarError;
        },
      });
  }

  //Funcion para eliminar partidos
  eliminarPartido(): void {
    this.partidoService.eliminar_partido(this.dataSelectPartido.id).subscribe({
      next: (data) => {
        let dialogEliminarSuccess = this.dialog.open(DialogComponent);
        dialogEliminarSuccess.componentInstance.header = this.headerSuccess;
        dialogEliminarSuccess.componentInstance.message = this.eliminarSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogEliminarError = this.dialog.open(DialogComponent);
        dialogEliminarError.componentInstance.header = this.headerError;
        dialogEliminarError.componentInstance.message = this.eliminarError;
      },
    });
  }

  //Funcion para consultar partidos
  consultarPartido(): void {
    this.partidoService.consultar_partidos().subscribe({
      next: (data) => {
        this.dataPartido = this.armarPartidos(data.data);
        let dialogConsultarSuccess = this.dialog.open(DialogComponent);
        dialogConsultarSuccess.componentInstance.header = this.headerSuccess;
        dialogConsultarSuccess.componentInstance.message = this.consultarSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogConsultarError = this.dialog.open(DialogComponent);
        dialogConsultarError.componentInstance.header = this.headerError;
        dialogConsultarError.componentInstance.message = this.consultarError;
      },
    });
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
}

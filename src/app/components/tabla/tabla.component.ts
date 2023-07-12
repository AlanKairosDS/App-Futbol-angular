import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquiposService } from 'src/app/services/equipos.service';
import { TablaService } from 'src/app/services/tabla.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface DataTablaId {
  nombre: string;
  puntos: number;
  victorias: number;
  empates: number;
  derrotas: number;
  golesFavor: number;
  golesContra: number;
  diferenciaGoles: number;
}

export interface SelectEquipo {
  nombre: string;
}

export interface SelectTabla {
  nombre: string;
}

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss'],
})
export class TablaComponent {
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public insertarSuccess = 'Se creo tabla general de forma correcta.';
  public insertarError = 'Ocurrio un problema al crear tabla general. Favor de intentar nuevamente.';
  public consultarSuccess = 'Se realiza la consulta de tabla general de forma correcta.';
  public consultarError = 'Ocurrio un problema al consultar tabla general. Favor de intentar nuevamente.';
  public consultarEquipoSuccess = 'Se realiza la consulta de equipos de forma correcta.';
  public consultarEquipoError = 'Ocurrio un problema al consultar equipos. Favor de intentar nuevamente.';
  public insertarEquipoSuccess = 'Se agrego equipo a la tabla general de forma correcta.';
  public insertarEquipoError =
    'Ocurrio un problema al agregar equipo a la tabla general. Favor de intentar nuevamente.';

  public equipos: boolean | undefined;
  public tablas: boolean | undefined;
  public nombre = new FormControl('', [Validators.required]);
  public dataTableId: any | undefined;
  public dataTable: any | undefined;
  public dataSelect: any | undefined;
  public nombreEquipo: string | undefined;
  public nombreTabla: string | undefined;
  public dataEquipo: any | undefined;
  public dataTablas: any | undefined;
  public dataSelectEquipo: any | undefined;
  public dataSelectTablas: any | undefined;

  public columnsEquipo = [
    {
      columnDef: 'nombre',
      header: 'Nombre Equipo',
      cell: (elementEquipo: SelectEquipo) => `${elementEquipo.nombre}`,
    },
  ];
  public displayedColumnsEquipo = this.columnsEquipo.map((c) => c.columnDef);

  public columnsTabla = [
    {
      columnDef: 'nombre',
      header: 'Nombre Tabla',
      cell: (elementTabla: SelectTabla) => `${elementTabla.nombre}`,
    },
  ];
  public displayedColumnsTabla = this.columnsTabla.map((c) => c.columnDef);

  public columnsTablaId = [
    {
      columnDef: 'nombre',
      header: 'Nombre Equipo',
      cell: (elementTabla: DataTablaId) => `${elementTabla.nombre}`,
    },
    {
      columnDef: 'puntos',
      header: 'Puntos',
      cell: (elementTabla: DataTablaId) => `${elementTabla.puntos}`,
    },
    {
      columnDef: 'victorias',
      header: 'Victorias',
      cell: (elementTabla: DataTablaId) => `${elementTabla.victorias}`,
    },
    {
      columnDef: 'empates',
      header: 'Empates',
      cell: (elementTabla: DataTablaId) => `${elementTabla.empates}`,
    },
    {
      columnDef: 'derrotas',
      header: 'Derrotas',
      cell: (elementTabla: DataTablaId) => `${elementTabla.derrotas}`,
    },
    {
      columnDef: 'golesFavor',
      header: 'Goles a Favor',
      cell: (elementTabla: DataTablaId) => `${elementTabla.golesFavor}`,
    },
    {
      columnDef: 'golesContra',
      header: 'Goles en Contra',
      cell: (elementTabla: DataTablaId) => `${elementTabla.golesContra}`,
    },
    {
      columnDef: 'diferenciaGoles',
      header: 'Diferencia',
      cell: (elementTabla: DataTablaId) => `${elementTabla.diferenciaGoles}`,
    },
  ];
  public displayColumnsTablaId = this.columnsTablaId.map((c) => c.columnDef);

  constructor(public equipoService: EquiposService, public tablaService: TablaService, public dialog: MatDialog) {}

  public newForm = new FormGroup({
    nombre: this.nombre,
  });

  getErrorNombre() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  frontEquipos(): void {
    this.equipos = true;
    this.tablas = false;
  }

  frontTablas(): void {
    this.equipos = false;
    this.tablas = true;
  }

  regresarPrincipal(): void {
    this.equipos = undefined;
    this.tablas = undefined;
  }

  limpiarCampos(): void {
    this.nombre.reset();
    this.dataTable = undefined;
    this.dataSelect = undefined;
    this.dataTableId = undefined;
  }

  selectRow(select: any): void {
    this.dataSelect = select;
    this.nombre.setValue(select.nombre);
  }

  limpiarSeleccion(): void {
    this.dataEquipo = undefined;
    this.dataSelectEquipo = undefined;
    this.dataTablas = undefined;
    this.dataSelectTablas = undefined;
    this.nombreEquipo = undefined;
    this.nombreTabla = undefined;
  }

  selectRowEquipo(select: any): void {
    this.dataSelectEquipo = select;
    this.nombreEquipo = select.nombre;
  }

  selectRowTabla(select: any): void {
    this.dataSelectTablas = select;
    this.nombreTabla = select.nombre;
  }

  nuevaTabla(): void {
    this.tablaService
      .nueva_tabla({
        nombre: this.nombre.value,
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

  consultarTabla(): void {
    this.tablaService.consultar_tablas().subscribe({
      next: (data) => {
        if (this.tablas) {
          this.dataTable = data.data;
        } else {
          this.dataTablas = data.data;
        }

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

  consultarTablaId(): void {
    this.tablaService.consultar_tabla_id(this.dataSelect.id).subscribe({
      next: (data) => {
        this.dataTableId = this.armarTablaGeneral(data.data[0].equipos);
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

  armarTablaGeneral(data: any) {
    let tablaGeneral: {
      nombre: any;
      puntos: any;
      victorias: any;
      empates: any;
      derrotas: any;
      golesFavor: any;
      golesContra: any;
      diferenciaGoles: any;
    }[] = [];

    data.forEach(
      (element: {
        equipo: { nombre: any };
        puntos: any;
        victorias: any;
        empates: any;
        derrotas: any;
        golesFavor: any;
        golesContra: any;
        diferenciaGoles: any;
      }) => {
        let json = {
          nombre: element.equipo.nombre,
          puntos: element.puntos,
          victorias: element.victorias,
          empates: element.empates,
          derrotas: element.derrotas,
          golesFavor: element.golesFavor,
          golesContra: element.golesContra,
          diferenciaGoles: element.diferenciaGoles,
        };

        tablaGeneral.push(json);
      }
    );

    return tablaGeneral;
  }

  consultarEquipo(): void {
    this.equipoService.consultar_equipo().subscribe({
      next: (data) => {
        this.dataEquipo = data.data;
        let dialogConsultarSuccess = this.dialog.open(DialogComponent);
        dialogConsultarSuccess.componentInstance.header = this.headerSuccess;
        dialogConsultarSuccess.componentInstance.message = this.consultarEquipoSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogConsultarError = this.dialog.open(DialogComponent);
        dialogConsultarError.componentInstance.header = this.headerError;
        dialogConsultarError.componentInstance.message = this.consultarEquipoError;
      },
    });
  }

  registrarEquipo(): void {
    this.tablaService.registrar_equipo(this.dataSelectTablas.id, this.dataSelectEquipo.id).subscribe({
      next: () => {
        let dialogInsertarSuccess = this.dialog.open(DialogComponent);
        dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
        dialogInsertarSuccess.componentInstance.message = this.insertarEquipoSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogInsertarError = this.dialog.open(DialogComponent);
        dialogInsertarError.componentInstance.header = this.headerError;
        dialogInsertarError.componentInstance.message = this.insertarEquipoError;
      },
    });
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EquiposService } from 'src/app/services/equipos.service';
import { FutbolistasService } from 'src/app/services/futbolistas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface DataEquipo {
  id: string;
  nombre: string;
  descripcion: string;
  escudo: string;
  fechaAlta: string;
  fechaModificacion: string;
}

export interface SelectEquipo {
  nombre: string;
}

export interface SelectFutbolista {
  nombre: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent {
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public insertarSuccess = 'Se inserto el equipo de forma correcta.';
  public insertarError =
    'Ocurrio un problema al insertar equipo. Favor de intentar nuevamente.';
  public actualizarSuccess = 'Se actualizo el equipo de forma correcta.';
  public actualizarError =
    'Ocurrio un problema al actualizar equipo. Favor de intentar nuevamente.';
  public eliminarSuccess = 'Se elimina el equipo de forma correcta.';
  public eliminarError =
    'Ocurrio un problema al eliminar equipo. Favor de intentar nuevamente.';
  public consultarSuccess =
    'Se realiza la consulta de equipo de forma correcta.';
  public consultarError =
    'Ocurrio un problema al consultar equipo. Favor de intentar nuevamente.';
  public insertarJugadorSuccess =
    'Se registro jugador en equipo de forma correcta.';
  public insertarJugadorError =
    'Ocurrio un problema al registrar jugador en equipo. Favor de intentar nuevamente.';
  public equipos: boolean | undefined;
  public futbolistas: boolean | undefined;
  public nombre = new FormControl('', [Validators.required]);
  public descripcion = new FormControl(null);
  public escudo = new FormControl(null);
  public dataTable: any | undefined;
  public dataSelect: any | undefined;
  public nombreEquipo: string | undefined;
  public nombreFutbolista: string | undefined;
  public dataEquipo: any | undefined;
  public dataFutbolista: any | undefined;
  public dataSelectEquipo: any | undefined;
  public dataSelectFutbolista: any | undefined;

  public columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: DataEquipo) => `${element.id}`,
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: DataEquipo) => `${element.nombre}`,
    },
    {
      columnDef: 'descripcion',
      header: 'Descripción',
      cell: (element: DataEquipo) => `${element.descripcion}`,
    },
    {
      columnDef: 'escudo',
      header: 'Escudo',
      cell: (element: DataEquipo) => `${element.escudo}`,
    },
    {
      columnDef: 'fechaAlta',
      header: 'Fecha Alta',
      cell: (element: DataEquipo) => `${element.fechaAlta}`,
    },
    {
      columnDef: 'fechaModificacion',
      header: 'Fecha Modificación',
      cell: (element: DataEquipo) => `${element.fechaModificacion}`,
    },
  ];
  public displayedColumns = this.columns.map((c) => c.columnDef);

  public columnsEquipo = [
    {
      columnDef: 'nombre',
      header: 'Nombre Equipo',
      cell: (elementEquipo: SelectEquipo) => `${elementEquipo.nombre}`,
    },
  ];
  public displayedColumnsEquipo = this.columnsEquipo.map((c) => c.columnDef);

  public columnsFutbolista = [
    {
      columnDef: 'nombre',
      header: 'Nombre Futbolista',
      cell: (elementFut: SelectFutbolista) => `${elementFut.nombre}`,
    },
  ];
  public displayedColumnsFutbolista = this.columnsFutbolista.map(
    (c) => c.columnDef
  );

  constructor(
    public equipoService: EquiposService,
    public futService: FutbolistasService,
    public dialog: MatDialog
  ) {}

  public newForm = new FormGroup({
    nombre: this.nombre,
    descripcion: this.descripcion,
    escudo: this.escudo,
  });

  getErrorNombre() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  frontEquipos(): void {
    this.equipos = true;
    this.futbolistas = false;
  }

  frontFutbolistas(): void {
    this.equipos = false;
    this.futbolistas = true;
  }

  regresarPrincipal(): void {
    this.equipos = undefined;
    this.futbolistas = undefined;
  }

  insertarEquipo(): void {
    this.equipoService
      .insertar_equipo({
        nombre: this.nombre.value,
        posicion: this.descripcion.value,
        escudo: this.escudo.value,
      })
      .subscribe(
        (data) => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message =
            this.insertarSuccess;
        },
        (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.insertarError;
        }
      );
  }

  actualizarEquipo(): void {
    this.equipoService
      .actualizar_equipo(
        {
          nombre: this.nombre.value,
          posicion: this.descripcion.value,
          escudo: this.escudo.value,
        },
        this.dataSelect.id
      )
      .subscribe(
        (data) => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message =
            this.actualizarSuccess;
        },
        (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.actualizarError;
        }
      );
  }

  eliminarEquipo(): void {
    this.equipoService.eliminar_equipo(this.dataSelect.id).subscribe(
      (data) => {
        let dialogInsertarSuccess = this.dialog.open(DialogComponent);
        dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
        dialogInsertarSuccess.componentInstance.message = this.eliminarSuccess;
      },
      (err: HttpErrorResponse) => {
        let dialogInsertarError = this.dialog.open(DialogComponent);
        dialogInsertarError.componentInstance.header = this.headerError;
        dialogInsertarError.componentInstance.message = this.eliminarError;
      }
    );
  }

  consultarEquipo(): void {
    this.equipoService.consultar_equipo().subscribe({
      next: (data) => {
        if (this.equipos) {
          this.dataTable = data.data;
        } else {
          this.dataEquipo = data.data;
        }

        let dialogConsultarSuccess = this.dialog.open(DialogComponent);
        dialogConsultarSuccess.componentInstance.header = this.headerSuccess;
        dialogConsultarSuccess.componentInstance.message =
          this.consultarSuccess;
      },
      error: (err: HttpErrorResponse) => {
        let dialogConsultarError = this.dialog.open(DialogComponent);
        dialogConsultarError.componentInstance.header = this.headerError;
        dialogConsultarError.componentInstance.message = this.consultarError;
      },
    });
  }

  consultarFutbolista(): void {
    this.futService.consultar_futbolista().subscribe(
      (data) => {
        this.dataFutbolista = data.data;
        let dialogConsFutSuccess = this.dialog.open(DialogComponent);
        dialogConsFutSuccess.componentInstance.header = this.headerSuccess;
        dialogConsFutSuccess.componentInstance.message = this.consultarSuccess;
      },
      (err: HttpErrorResponse) => {
        let dialogConsFutError = this.dialog.open(DialogComponent);
        dialogConsFutError.componentInstance.header = this.headerError;
        dialogConsFutError.componentInstance.message = this.consultarError;
      }
    );
  }

  limpiarCampos(): void {
    this.nombre.reset();
    this.descripcion.reset();
    this.escudo.reset();
    this.dataTable = undefined;
    this.dataSelect = undefined;
  }

  selectRow(select: any): void {
    this.dataSelect = select;
    this.nombre.setValue(select.nombre);
    this.descripcion.setValue(select.descripcion);
    this.escudo.setValue(select.escudo);
  }

  selectRowEquipo(select: any): void {
    this.dataSelectEquipo = select;
    this.nombreEquipo = select.nombre;
  }

  selectRowFutbolista(select: any): void {
    this.dataSelectFutbolista = select;
    this.nombreFutbolista = select.nombre;
  }

  limpiarSeleccion(): void {
    this.dataEquipo = undefined;
    this.dataSelectEquipo = undefined;
    this.dataFutbolista = undefined;
    this.dataSelectFutbolista = undefined;
    this.nombreEquipo = undefined;
    this.nombreFutbolista = undefined;
  }

  registrarFutbolista(): void {
    this.equipoService
      .insertar_futbolista_equipo(
        this.dataSelectEquipo.id,
        this.dataSelectFutbolista.id
      )
      .subscribe({
        next: () => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message =
            this.insertarJugadorSuccess;
        },
        error: (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message =
            this.insertarJugadorError;
        },
      });
  }
}

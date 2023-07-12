import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FutbolistasService } from 'src/app/services/futbolistas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface DataFutbolista {
  id: string;
  nombre: string;
  posicion: string;
  fechaAlta: string;
  fechaModificacion: string;
}

@Component({
  selector: 'app-futbolistas',
  templateUrl: './futbolistas.component.html',
  styleUrls: ['./futbolistas.component.scss'],
})
export class FutbolistasComponent {
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public insertarSuccess = 'Se inserto el futbolista de forma correcta.';
  public insertarError = 'Ocurrio un problema al insertar futbolista. Favor de intentar nuevamente.';
  public actualizarSuccess = 'Se actualizo el futbolista de forma correcta.';
  public actualizarError = 'Ocurrio un problema al actualizar futbolista. Favor de intentar nuevamente.';
  public eliminarSuccess = 'Se elimina el futbolista de forma correcta.';
  public eliminarError = 'Ocurrio un problema al eliminar futbolista. Favor de intentar nuevamente.';
  public consultarSuccess = 'Se realiza la consulta de futbolistas de forma correcta.';
  public consultarError = 'Ocurrio un problema al consultar futbolistas. Favor de intentar nuevamente.';
  public nombre = new FormControl('', [Validators.required]);
  public posicion = new FormControl('', [Validators.required]);
  public dataTable: any | undefined;
  public dataSelect: any | undefined;

  public columns = [
    {
      columnDef: 'id',
      header: 'ID',
      cell: (element: DataFutbolista) => `${element.id}`,
    },
    {
      columnDef: 'nombre',
      header: 'Nombre',
      cell: (element: DataFutbolista) => `${element.nombre}`,
    },
    {
      columnDef: 'posicion',
      header: 'Posición',
      cell: (element: DataFutbolista) => `${element.posicion}`,
    },
    {
      columnDef: 'fechaAlta',
      header: 'Fecha Alta',
      cell: (element: DataFutbolista) => `${element.fechaAlta}`,
    },
    {
      columnDef: 'fechaModificacion',
      header: 'Fecha Modificación',
      cell: (element: DataFutbolista) => `${element.fechaModificacion}`,
    },
  ];
  public displayedColumns = this.columns.map((c) => c.columnDef);

  constructor(public futService: FutbolistasService, public dialog: MatDialog) {}

  public newForm = new FormGroup({
    nombre: this.nombre,
    posicion: this.posicion,
  });

  getErrorNombre() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorPosicion() {
    if (this.posicion.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  insertarFutbolista(): void {
    this.futService
      .insertar_futbolista({
        nombre: this.nombre.value,
        posicion: this.posicion.value,
      })
      .subscribe(
        (data) => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message = this.insertarSuccess;
        },
        (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.insertarError;
        }
      );
  }

  actualizarFutbolista(): void {
    this.futService
      .actualizar_futbolista(
        {
          nombre: this.nombre.value,
          posicion: this.posicion.value,
        },
        this.dataSelect.id
      )
      .subscribe(
        (data) => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message = this.actualizarSuccess;
        },
        (err: HttpErrorResponse) => {
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.actualizarError;
        }
      );
  }

  eliminarFutbolista(): void {
    this.futService.eliminar_futbolista(this.dataSelect.id).subscribe(
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

  consultarFutbolista(): void {
    this.futService.consultar_futbolista().subscribe(
      (data) => {
        this.dataTable = data.data;
        let dialogInsertarSuccess = this.dialog.open(DialogComponent);
        dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
        dialogInsertarSuccess.componentInstance.message = this.consultarSuccess;
      },
      (err: HttpErrorResponse) => {
        let dialogInsertarError = this.dialog.open(DialogComponent);
        dialogInsertarError.componentInstance.header = this.headerError;
        dialogInsertarError.componentInstance.message = this.consultarError;
      }
    );
  }

  limpiarCampos(): void {
    this.nombre.reset();
    this.posicion.reset();
    this.dataTable = undefined;
    this.dataSelect = undefined;
  }

  selectRow(select: any): void {
    this.dataSelect = select;
    this.nombre.setValue(select.nombre);
    this.posicion.setValue(select.posicion);
  }
}

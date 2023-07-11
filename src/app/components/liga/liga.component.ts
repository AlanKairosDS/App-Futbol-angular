import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LigasService } from 'src/app/services/ligas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

export interface SelectLiga {
  nombre: string;
}

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.scss'],
})
export class LigaComponent {
  //Mensajes que se mostraran en modal
  public headerSuccess = 'Proceso ejecutado correctamente';
  public headerError = 'Proceso ejecutado de forma incorrecta';
  public registrarSuccess = 'Se creo la liga de forma correcta.';
  public registrarError = 'Ocurrio un problema al crear liga. Favor de intentar nuevamente.';
  //Variables para seccion de liga varonil
  public varonil: boolean | undefined;
  public nuevaLigaVaronil: boolean | undefined;
  public registrarLigaVaronil: boolean | undefined;
  //Variables para seccion de liga femenil
  public femenil: boolean | undefined;
  public nuevaLigaFemenil: boolean | undefined;
  public registrarLigaFemenil: boolean | undefined;
  //Variables para almacenar resultado de consultas
  public dataLigas: any | undefined;
  //Variables para formulario de crear liga
  public nombre = new FormControl('', [Validators.required]);

  //Constructor
  constructor(private ligaService: LigasService, private dialog: MatDialog, private formBuilder: FormBuilder) {}

  //Formulario para crear liga
  public formNuevaLiga = new FormGroup({
    nombre: this.nombre,
  });

  //Funcion para validar error en el formulario de crear liga
  getErrorNombre() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  //Funcion para limpiar campos de formulario para crear liga
  limpiarCampos(): void {
    this.nombre.reset();
  }

  //Funciones para mostrar tabla con ligas
  public columnsLiga = [
    {
      columnDef: 'nombre',
      header: 'Nombre de Ligas',
      cell: (elementTabla: SelectLiga) => `${elementTabla.nombre}`,
    },
  ];
  public displayedColumnsLiga = this.columnsLiga.map((c) => c.columnDef);

  //Funciones para el manejo de fronts de liga varonil y femenil
  principalVaronilFront(): void {
    this.varonil = undefined;
    this.femenil = undefined;
    this.nuevaLigaVaronil = undefined;
    this.registrarLigaVaronil = undefined;
  }

  varonilFront(): void {
    this.varonil = true;
    this.femenil = false;
    this.nuevaLigaVaronil = undefined;
    this.registrarLigaVaronil = undefined;
    this.dataLigas = undefined;
  }

  nuevaVaronilFront(): void {
    this.varonil = true;
    this.femenil = false;
    this.nuevaLigaVaronil = true;
    this.registrarLigaVaronil = false;
  }

  registrarVaronilFront(): void {
    this.varonil = true;
    this.femenil = false;
    this.nuevaLigaVaronil = false;
    this.registrarLigaVaronil = true;
  }

  principalFemenilFront(): void {
    this.varonil = undefined;
    this.femenil = undefined;
    this.nuevaLigaFemenil = undefined;
    this.registrarLigaFemenil = undefined;
  }

  femenilFront(): void {
    this.varonil = false;
    this.femenil = true;
    this.nuevaLigaFemenil = undefined;
    this.registrarLigaFemenil = undefined;
    this.dataLigas = undefined;
  }

  nuevaFemenilFront(): void {
    this.varonil = false;
    this.femenil = true;
    this.nuevaLigaFemenil = true;
    this.registrarLigaFemenil = false;
  }

  registrarFemenilFront(): void {
    this.varonil = false;
    this.femenil = true;
    this.nuevaLigaFemenil = false;
    this.registrarLigaFemenil = true;
  }

  validarLiga(): string {
    if (this.varonil) {
      return 'Varonil';
    } else {
      return 'Femenil';
    }
  }

  nuevaLiga(): void {
    this.ligaService
      .nueva_liga(this.validarLiga(), {
        nombre: this.nombre.value,
      })
      .subscribe({
        next: () => {
          let dialogInsertarSuccess = this.dialog.open(DialogComponent);
          dialogInsertarSuccess.componentInstance.header = this.headerSuccess;
          dialogInsertarSuccess.componentInstance.message = this.registrarSuccess;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          let dialogInsertarError = this.dialog.open(DialogComponent);
          dialogInsertarError.componentInstance.header = this.headerError;
          dialogInsertarError.componentInstance.message = this.registrarError;
        },
      });
  }

  consultarLigas(): void {
    this.ligaService.consultar_liga(this.validarLiga()).subscribe({
      next: (data) => {
        this.dataLigas = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}

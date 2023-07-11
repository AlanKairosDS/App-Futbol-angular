import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EquiposService } from 'src/app/services/equipos.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { TablaService } from 'src/app/services/tabla.service';
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
  public dataEquipos: any | undefined;
  public dataPartidos: any | undefined;
  public dataResultados: any | undefined;
  public dataTablaGeneral: any | undefined;
  public dataGoles: any | undefined;
  public dataTarjetas: any | undefined;
  public dataMvp: any | undefined;
  public dataLigas: any | undefined;
  //Variables para formulario de crear liga
  public nombre = new FormControl('', [Validators.required]);
  //Variables para stepper
  public FormLigas = this.formBuilder.group({ estatus: [''] });
  public FormEquipos = this.formBuilder.group({ estatus: [''] });
  public arrayEquipos = new Set<any>();
  public FormPartidos = this.formBuilder.group({ estatus: [''] });
  public arrayPartidos = new Set<any>();
  public FormTablaGen = this.formBuilder.group({ estatus: [''] });
  public FormResultados = this.formBuilder.group({ estatus: [''] });
  public arrayResultados = new Set<any>();
  public FormGoles = this.formBuilder.group({ estatus: [''] });
  public arrayGoles = new Set<any>();
  public FormTarjetas = this.formBuilder.group({ estatus: [''] });
  public arrayTarjetas = new Set<any>();
  public FormMvp = this.formBuilder.group({ estatus: [''] });
  public arrayMvp = new Set<any>();

  //Constructor
  constructor(
    private tablaService: TablaService,
    private ligaService: LigasService,
    private equipoService: EquiposService,
    private partidoService: PartidosService,
    private resultadoService: ResultadosService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

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
    this.consultarLigas();
    this.consultarEquipos();
    this.consultarPartidos();
    this.consultarTablaGeneral();
    this.consultarResultados();
    this.consultarGoles();
    this.consultarTarjetas();
    this.consultarMvp();
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
    this.consultarLigas();
    this.consultarEquipos();
    this.consultarPartidos();
    this.consultarTablaGeneral();
    this.consultarResultados();
    this.consultarGoles();
    this.consultarTarjetas();
    this.consultarMvp();
  }

  validarLiga(): string {
    if (this.varonil) {
      return 'Varonil';
    } else {
      return 'Femenil';
    }
  }

  consultarEquipos(): void {
    this.equipoService.consultar_equipo().subscribe({
      next: (data) => {
        this.dataEquipos = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  consultarPartidos(): void {
    this.partidoService.consultar_partidos().subscribe({
      next: (data) => {
        this.dataPartidos = this.armarPartidos(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
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

  consultarResultados(): void {
    this.resultadoService.consultar_resultados().subscribe({
      next: (data) => {
        this.dataResultados = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  consultarTablaGeneral(): void {
    this.tablaService.consultar_tablas().subscribe({
      next: (data) => {
        this.dataTablaGeneral = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  consultarGoles(): void {
    this.resultadoService.consultar_goles().subscribe({
      next: (data) => {
        this.dataGoles = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  consultarTarjetas(): void {
    this.resultadoService.consultar_tarjetas().subscribe({
      next: (data) => {
        this.dataTarjetas = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  consultarMvp(): void {
    this.resultadoService.consultar_mvp().subscribe({
      next: (data) => {
        this.dataMvp = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
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

  armarPeticionRegistrarLiga(): void {}

  registrarInformacionLiga(): void {}
}

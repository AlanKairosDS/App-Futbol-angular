import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { EquiposService } from 'src/app/services/equipos.service';
import { PartidosService } from 'src/app/services/partidos.service';
import { ResultadosService } from 'src/app/services/resultados.service';
import { TablaService } from 'src/app/services/tabla.service';
import { LigasService } from 'src/app/services/ligas.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LigaComponent } from '../liga/liga.component';

//Interfaz para tabla de liga
export interface SelectLiga {
  nombre: string;
}

//Interfaz para tabla de equipos
export interface SelectEquipo {
  nombre: string;
}

//Interfaz para tabla de partidos
export interface SelectPartido {
  jornada: number;
  fecha: string;
  hora: number;
  equipoLocal: string;
  equipoVisitante: string;
}

//Interfaz para tabla de tabla general
export interface SelectTabla {
  nombre: string;
}

//Interfaz para tabla de resultados
export interface SelectResultado {
  partido: string;
  jornada: number;
  local: number;
  visitante: number;
}

//Interfaz para tabla de goles
export interface SelectGoles {
  futbolista: string;
  goles: number;
  asistencias: number;
}

//Interfaz para tabla de tarjetas
export interface SelectTarjetas {
  futbolista: string;
  amarillas: number;
  rojas: number;
}

//Interfaz para tabla de mvp
export interface SelectMvp {
  futbolista: string;
  jornada: number;
}

@Component({
  selector: 'app-femenil',
  templateUrl: './femenil.component.html',
  styleUrls: ['./femenil.component.scss'],
})
export class FemenilComponent {
  //Mensajes que se mostraran en modal
  public headerSuccess = 'Proceso ejecutado correctamente';
  public registroSuccess = 'Se registro la informacion de forma exitosa.';
  //Variables para validar front de administracion a mostrar
  public mostrarPrincipal: boolean | undefined;
  public mostrarEquipos: boolean | undefined;
  public mostrarPartidos: boolean | undefined;
  public mostrarTablaGen: boolean | undefined;
  public mostrarResultados: boolean | undefined;
  public mostrarGoles: boolean | undefined;
  public mostrarTarjetas: boolean | undefined;
  public mostrarMvp: boolean | undefined;
  //Variables para almacenar resultado de consultas
  public dataEquipos: any | undefined;
  public dataSelectEquipos: any | undefined;
  public dataPartidos: any | undefined;
  public dataSelectPartidos: any | undefined;
  public dataResultados: any | undefined;
  public dataSelectResultados: any | undefined;
  public dataTablaGeneral: any | undefined;
  public dataSelectTabla: any | undefined;
  public dataGoles: any | undefined;
  public dataSelectGoles: any | undefined;
  public dataTarjetas: any | undefined;
  public dataSelectTarjetas: any | undefined;
  public dataMvp: any | undefined;
  public dataSelectMvp: any | undefined;
  public dataLigas: any | undefined;
  public dataSelectLigas: any | undefined;
  //Variables para stepper
  public FormLigas = this.formBuilder.group({ liga: [{ value: '', disabled: true }] });
  public FormEquipos = this.formBuilder.group({ equipos: [{ value: '', disabled: true }] });
  public FormPartidos = this.formBuilder.group({ partidos: [{ value: '', disabled: true }] });
  public FormTablaGen = this.formBuilder.group({ tablaGen: [{ value: '', disabled: true }] });
  public FormResultados = this.formBuilder.group({ resultados: [{ value: '', disabled: true }] });
  public FormGoles = this.formBuilder.group({ goles: [{ value: '', disabled: true }] });
  public FormTarjetas = this.formBuilder.group({ tarjetas: [{ value: '', disabled: true }] });
  public FormMvp = this.formBuilder.group({ mvp: [{ value: '', disabled: true }] });

  //Constructor
  constructor(
    private tablaService: TablaService,
    private ligaService: LigasService,
    private equipoService: EquiposService,
    private partidoService: PartidosService,
    private resultadoService: ResultadosService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private ligaComp: LigaComponent
  ) {
    this.mostrarPrincipal = true;
    this.consultarLigas();
    this.consultarEquipos();
    this.consultarPartidos();
    this.consultarTablaGeneral();
    this.consultarResultados();
    this.consultarGoles();
    this.consultarTarjetas();
    this.consultarMvp();
  }

  //Funcion para mostrar menu principal
  mostrarFrontPrincipal(): void {
    this.mostrarPrincipal = true;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de equipos
  mostrarFrontEquipos(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = true;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de partidos
  mostrarFrontPartidos(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = true;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de tabla general
  mostrarFrontTablaGen(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = true;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de resultados
  mostrarFrontResultados(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = true;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de goles
  mostrarFrontGoles(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = true;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de tarjetas
  mostrarFrontTarjetas(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = true;
    this.mostrarMvp = undefined;
  }

  //Funcion para mostrar menu de mvp
  mostrarFrontMvp(): void {
    this.mostrarPrincipal = undefined;
    this.mostrarEquipos = undefined;
    this.mostrarPartidos = undefined;
    this.mostrarTablaGen = undefined;
    this.mostrarResultados = undefined;
    this.mostrarGoles = undefined;
    this.mostrarTarjetas = undefined;
    this.mostrarMvp = true;
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

  //Funcion para almacenar datos seleccionados de la tabla de ligas
  selectRowLiga(select: any): void {
    this.dataSelectLigas = select;
    this.FormLigas.setValue({ liga: select.nombre });
  }

  //Funciones para mostrar tabla con equipos
  public columnsEquipo = [
    {
      columnDef: 'nombre',
      header: 'Nombre Equipo',
      cell: (elementEquipo: SelectEquipo) => `${elementEquipo.nombre}`,
    },
  ];
  public displayedColumnsEquipo = this.columnsEquipo.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla de equipos
  selectRowEquipos(select: any): void {
    this.dataSelectEquipos = select;
    this.FormEquipos.setValue({ equipos: select.nombre });
  }

  //Funciones para mostrar tabla de Partidos
  public columnsPartido = [
    {
      columnDef: 'equipoLocal',
      header: 'Equipo Local',
      cell: (elementTabla: SelectPartido) => `${elementTabla.equipoLocal}`,
    },
    {
      columnDef: 'equipoVisitante',
      header: 'Equipo Visitante',
      cell: (elementTabla: SelectPartido) => `${elementTabla.equipoVisitante}`,
    },
    {
      columnDef: 'jornada',
      header: 'Jornada',
      cell: (elementTabla: SelectPartido) => `${elementTabla.jornada}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (elementTabla: SelectPartido) => `${elementTabla.fecha}`,
    },
    {
      columnDef: 'hora',
      header: 'Hora',
      cell: (elementTabla: SelectPartido) => `${elementTabla.hora}`,
    },
  ];
  public displayColumnsPartido = this.columnsPartido.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla de partidos
  selectRowPartidos(select: any): void {
    this.dataSelectPartidos = select;
    let cadenaPartido = select.equipoLocal + ' vs ' + select.equipoVisitante;
    this.FormPartidos.setValue({ partidos: cadenaPartido });
  }

  //Funciones para mostrar tabla de tablas generales
  public columnsTablaGen = [
    {
      columnDef: 'nombre',
      header: 'Nombre Tabla General',
      cell: (elementTabla: SelectTabla) => `${elementTabla.nombre}`,
    },
  ];
  public displayedColumnsTablaGen = this.columnsTablaGen.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla general
  selectRowTablaGen(select: any): void {
    this.dataSelectTabla = select;
    this.FormTablaGen.setValue({ tablaGen: select.nombre });
  }

  //Funciones para mostrar tabla de Resultados
  public columnsResultados = [
    {
      columnDef: 'partido',
      header: 'Partido',
      cell: (elementTabla: SelectResultado) => `${elementTabla.partido}`,
    },
    {
      columnDef: 'jornada',
      header: 'Jornada',
      cell: (elementTabla: SelectResultado) => `${elementTabla.jornada}`,
    },
    {
      columnDef: 'local',
      header: 'Marcador Local',
      cell: (elementTabla: SelectResultado) => `${elementTabla.local}`,
    },
    {
      columnDef: 'visitante',
      header: 'Marcador Visitante',
      cell: (elementTabla: SelectResultado) => `${elementTabla.visitante}`,
    },
  ];
  public displayColumnsResultados = this.columnsResultados.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla resultados
  selectRowResultado(select: any): void {
    this.dataSelectResultados = select;
    this.FormResultados.setValue({ resultados: select.partido });
  }

  //Funciones para mostrar tabla de goles
  public columnsGoles = [
    {
      columnDef: 'futbolista',
      header: 'Futbolista',
      cell: (elementTabla: SelectGoles) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'goles',
      header: 'Goles',
      cell: (elementTabla: SelectGoles) => `${elementTabla.goles}`,
    },
    {
      columnDef: 'asistencias',
      header: 'Asistencias',
      cell: (elementTabla: SelectGoles) => `${elementTabla.asistencias}`,
    },
  ];
  public displayColumnsGoles = this.columnsGoles.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla goles
  selectRowGoles(select: any): void {
    this.dataSelectGoles = select;
    this.FormGoles.setValue({ goles: select.futbolista });
  }

  //Funciones para mostrar tabla de tarjetas
  public columnsTarjetas = [
    {
      columnDef: 'futbolista',
      header: 'Futbolista',
      cell: (elementTabla: SelectTarjetas) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'amarillas',
      header: 'Tarjetas Amarillas',
      cell: (elementTabla: SelectTarjetas) => `${elementTabla.amarillas}`,
    },
    {
      columnDef: 'rojas',
      header: 'Tarjetas Rojas',
      cell: (elementTabla: SelectTarjetas) => `${elementTabla.rojas}`,
    },
  ];
  public displayColumnsTarjetas = this.columnsTarjetas.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla tarjetas
  selectRowTarjetas(select: any): void {
    this.dataSelectTarjetas = select;
    this.FormTarjetas.setValue({ tarjetas: select.futbolista });
  }

  //Funciones para mostrar tabla de mvps
  public columnsMvp = [
    {
      columnDef: 'futbolista',
      header: 'Futbolista',
      cell: (elementTabla: SelectMvp) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'jornada',
      header: 'Jornada',
      cell: (elementTabla: SelectMvp) => `${elementTabla.jornada}`,
    },
  ];
  public displayColumnsMvp = this.columnsMvp.map((c) => c.columnDef);

  //Funcion para almacenar datos seleccionados de la tabla mvp
  selectRowMvp(select: any): void {
    this.dataSelectMvp = select;
    this.FormMvp.setValue({ mvp: select.futbolista });
  }

  //Funcion para regresar al menu principal de liga varonil
  menuAnterior(): void {
    this.ligaComp.femenilFront();
  }

  //Funcion para consultar equipos
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

  //Funcion para consultar partidos
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

  //Funcion para armar json con informacion relevante de partidos
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

  //Funcion para consultar
  consultarResultados(): void {
    this.resultadoService.consultar_resultados().subscribe({
      next: (data) => {
        this.dataResultados = this.armarResultados(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para armar json con informacion relevante de resultados
  armarResultados(data: any) {
    let resultados: { id: any; partido: string; jornada: any; local: any; visitante: any }[] = [];

    data.forEach(
      (element: {
        id: any;
        partido: { equipoLocal: { nombre: string }; equipoVisitante: { nombre: string } };
        jornada: any;
        marcadorLocal: any;
        marcadorVisita: any;
      }) => {
        let json = {
          id: element.id,
          partido: element.partido.equipoLocal.nombre + ' vs ' + element.partido.equipoVisitante.nombre,
          jornada: element.jornada,
          local: element.marcadorLocal,
          visitante: element.marcadorVisita,
        };

        resultados.push(json);
      }
    );

    return resultados;
  }

  //Funcion para consultar tabla general
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

  //Funcion para consultar goles
  consultarGoles(): void {
    this.resultadoService.consultar_goles().subscribe({
      next: (data) => {
        this.dataGoles = this.armarGoles(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para armar json con informacion relevante de goles
  armarGoles(data: any) {
    let goles: { id: any; futbolista: any; goles: any; asistencias: any }[] = [];

    data.forEach((element: { id: any; futbolista: { nombre: any }; goles: any; asistencias: any }) => {
      let json = {
        id: element.id,
        futbolista: element.futbolista.nombre,
        goles: element.goles,
        asistencias: element.asistencias,
      };

      goles.push(json);
    });

    return goles;
  }

  //Funcion para consultar tarjetas
  consultarTarjetas(): void {
    this.resultadoService.consultar_tarjetas().subscribe({
      next: (data) => {
        this.dataTarjetas = this.armarTarjetas(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para armar json con informacion relevante de tarjetas
  armarTarjetas(data: any) {
    let tarjetas: { id: any; futbolista: any; amarillas: any; rojas: any }[] = [];

    data.forEach((element: { id: any; futbolista: { nombre: any }; amarillas: any; rojas: any }) => {
      let json = {
        id: element.id,
        futbolista: element.futbolista.nombre,
        amarillas: element.amarillas,
        rojas: element.rojas,
      };

      tarjetas.push(json);
    });

    return tarjetas;
  }

  //Funcion para consultar mvp
  consultarMvp(): void {
    this.resultadoService.consultar_mvp().subscribe({
      next: (data) => {
        this.dataMvp = this.armarMvp(data.data);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para armar json con informacion relevante de mvp
  armarMvp(data: any) {
    let mvp: { id: any; futbolista: any; jornada: any }[] = [];

    data.forEach((element: { id: any; futbolista: { nombre: any }; jornada: any }) => {
      let json = {
        id: element.id,
        futbolista: element.futbolista.nombre,
        jornada: element.jornada,
      };

      mvp.push(json);
    });

    return mvp;
  }

  //Funcion para consultar ligas
  consultarLigas(): void {
    this.ligaService.consultar_liga('Femenil').subscribe({
      next: (data) => {
        this.dataLigas = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar equipos en liga
  registrarEquiposLiga() {
    this.ligaService.agregar_equipo_liga('Femenil', this.dataSelectLigas.id, this.dataSelectEquipos.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar partidos en liga
  registrarPartidosLiga() {
    this.ligaService.agregar_partido_liga('Femenil', this.dataSelectLigas.id, this.dataSelectPartidos.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar tabla general en liga
  registrarTablaGenLiga() {
    this.ligaService.agregar_tabla_liga('Femenil', this.dataSelectLigas.id, this.dataSelectTabla.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar resultados en liga
  registrarResultadosLiga() {
    this.ligaService
      .agregar_resultado_liga('Femenil', this.dataSelectLigas.id, this.dataSelectResultados.id)
      .subscribe({
        next: () => {
          let dialogSuccess = this.dialog.open(DialogComponent);
          dialogSuccess.componentInstance.header = this.headerSuccess;
          dialogSuccess.componentInstance.message = this.registroSuccess;

          dialogSuccess.afterClosed().subscribe(() => {
            this.mostrarFrontPrincipal();
            this.menuAnterior();
          });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
  }

  //Funcion para registrar goles en liga
  registrarGolesLiga() {
    this.ligaService.agregar_goles_liga('Femenil', this.dataSelectLigas.id, this.dataSelectGoles.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar tarjetas en liga
  registrarTarjetasLiga() {
    this.ligaService.agregar_tarjetas_liga('Femenil', this.dataSelectLigas.id, this.dataSelectTarjetas.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para registrar mvp en liga
  registrarMvpLiga() {
    this.ligaService.agregar_mvp_liga('Femenil', this.dataSelectLigas.id, this.dataSelectMvp.id).subscribe({
      next: () => {
        let dialogSuccess = this.dialog.open(DialogComponent);
        dialogSuccess.componentInstance.header = this.headerSuccess;
        dialogSuccess.componentInstance.message = this.registroSuccess;

        dialogSuccess.afterClosed().subscribe(() => {
          this.mostrarFrontPrincipal();
          this.menuAnterior();
        });
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
}

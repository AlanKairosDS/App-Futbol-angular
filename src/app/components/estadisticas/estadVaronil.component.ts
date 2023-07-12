import { Component } from '@angular/core';
import { EstadisticasComponent } from './estadisticas.component';
import { LigasService } from 'src/app/services/ligas.service';
import { HttpErrorResponse } from '@angular/common/http';

//Interfaz para tabla general
export interface TablaGeneral {
  nombre: string;
  puntos: number;
  victorias: number;
  empates: number;
  derrotas: number;
  golesFavor: number;
  golesContra: number;
  diferenciaGoles: number;
}

//Interfaz para tabla de resultados
export interface TablaResultados {
  equipoLocal: string;
  marcadorLocal: number;
  equipoVisita: string;
  marcadorVisita: number;
  jornada: number;
  fecha: string;
  hora: string;
}

//Interfaz para tabla de goleo
export interface TablaGoleo {
  futbolista: string;
  equipo: string;
  goles: number;
}

//Interfaz para tabla de asistencias
export interface TablaAsistencias {
  futbolista: string;
  equipo: string;
  asistencias: number;
}

//Interfaz para tabla de tarjetas amarillas
export interface TablaAmarillas {
  futbolista: string;
  equipo: string;
  amarillas: number;
}

//Interfaz para tabla de tarjetas rojas
export interface TablaRojas {
  futbolista: string;
  equipo: string;
  rojas: number;
}

//Interfaz para tabla de jugadores mvp
export interface TablaMvp {
  futbolista: string;
  equipo: string;
  jornada: number;
}

@Component({
  selector: 'app-estad-varonil',
  templateUrl: './estadVaronil.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadVaronilComponent {
  //Variables para validar front de administracion a mostrar
  public mostrarLigas: boolean | undefined;
  public mostrarPrincipal: boolean | undefined;
  public mostrarTablaGen: boolean | undefined;
  public mostrarResultados: boolean | undefined;
  public mostrarGoles: boolean | undefined;
  public mostrarAsistencias: boolean | undefined;
  public mostrarAmarillas: boolean | undefined;
  public mostrarRojas: boolean | undefined;
  public mostrarMvp: boolean | undefined;
  //Variables para almacenar datos de ligas
  public dataLigas: any | undefined;
  public dataSelectLiga: any | undefined;
  public dataTablaGen: any | undefined;
  public dataResultados: any | undefined;
  public dataGoles: any | undefined;
  public dataAsistencias: any | undefined;
  public dataAmarillas: any | undefined;
  public dataRojas: any | undefined;
  public dataMvp: any | undefined;

  //Constructor
  constructor(private estadisticas: EstadisticasComponent, private ligaService: LigasService) {
    this.mostrarLigas = true;
    this.consultarLigas();
  }

  //Funcion para regresar al menu principal
  menuPrincipal(): void {
    this.estadisticas.principalFront();
  }

  //Funciones para mostrar front con ligas disponibles
  mostrarFrontLigas(): void {
    this.dataSelectLiga = undefined;
    this.dataTablaGen = undefined;
    this.dataResultados = undefined;
    this.dataGoles = undefined;
    this.dataAsistencias = undefined;
    this.dataAmarillas = undefined;
    this.dataRojas = undefined;
    this.dataMvp = undefined;
    this.mostrarLigas = true;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar front con las diferentes estadisticas de cada liga
  mostrarFrontPrincipal(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = true;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla general
  mostrarFrontTablaGeneral(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = true;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar resultados
  mostrarFrontResultados(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = true;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla de goleo
  mostrarFrontGoles(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = true;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla de asistencias
  mostrarFrontAsistencias(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = true;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla de tarjetas amarillas
  mostrarFrontAmarillas(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = true;
    this.mostrarRojas = false;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla de tarjetas rojas
  mostrarFrontRojas(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = true;
    this.mostrarMvp = false;
  }

  //Funcion para mostrar tabla de mvp
  mostrarFrontMvp(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = false;
    this.mostrarTablaGen = false;
    this.mostrarResultados = false;
    this.mostrarGoles = false;
    this.mostrarAsistencias = false;
    this.mostrarAmarillas = false;
    this.mostrarRojas = false;
    this.mostrarMvp = true;
  }

  //Funcion para consultar ligas
  consultarLigas(): void {
    this.ligaService.consultar_liga('Varonil').subscribe({
      next: (data) => {
        this.dataLigas = data.data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  //Funcion para almacenar datos de la liga seleccionada
  selectLiga(select: any): void {
    this.dataSelectLiga = select;
    this.mostrarFrontPrincipal();
    this.armarTablaGeneral(select);
    this.armarTablaResultados(select);
    this.armarTablaGoleo(select);
    this.armarTablaAsistencias(select);
    this.armarTablaAmarillas(select);
    this.armarTablaRojas(select);
    this.armarTablaMvp(select);
  }

  //Funcion para armar tabla general
  armarTablaGeneral(liga: any): void {
    let tablaGeneral = [];

    if (liga.tablaGeneral !== null && liga.tablaGeneral !== undefined) {
      if (liga.tablaGeneral.equipos.length > 0) {
        for (let tabla of liga.tablaGeneral.equipos) {
          let jsonTabla = {
            nombre: tabla.equipo.nombre,
            puntos: tabla.puntos,
            victorias: tabla.victorias,
            empates: tabla.empates,
            derrotas: tabla.derrotas,
            golesFavor: tabla.golesFavor,
            golesContra: tabla.golesContra,
            diferenciaGoles: tabla.diferenciaGoles,
          };

          tablaGeneral.push(jsonTabla);
        }
      }
    }

    if (tablaGeneral.length > 0) {
      this.dataTablaGen = tablaGeneral.sort((x, y) => {
        if (y.puntos < x.puntos) {
          return -1;
        }

        if (y.puntos > x.puntos) {
          return 1;
        }

        return y.diferenciaGoles - x.diferenciaGoles;
      });
    }
  }

  //Funcion para armar tabla de resultados
  armarTablaResultados(liga: any): void {
    let tablaResultados = [];

    if (liga.resultados.length > 0) {
      for (let resultado of liga.resultados) {
        let jsonResultado = {
          equipoLocal: resultado.partido.equipoLocal.nombre,
          marcadorLocal: resultado.marcadorLocal,
          equipoVisita: resultado.partido.equipoVisitante.nombre,
          marcadorVisita: resultado.marcadorVisita,
          jornada: resultado.jornada,
          fecha: resultado.partido.fecha,
          hora: resultado.partido.hora,
        };

        tablaResultados.push(jsonResultado);
      }
    }

    if (tablaResultados.length > 0) {
      this.dataResultados = tablaResultados.sort((x, y) => x.jornada - y.jornada);
    }
  }

  //Funcion para armar tabla de goleo
  armarTablaGoleo(liga: any): void {
    let tablaGoleo = [];

    if (liga.golesAsistencias.length > 0) {
      for (let goles of liga.golesAsistencias) {
        let equiposTabla = liga.tablaGeneral.equipos;

        for (let equipos of equiposTabla) {
          let listaFutbolistas = equipos.equipo.futbolistas;

          for (let futbolista of listaFutbolistas) {
            if (futbolista.id === goles.futbolista) {
              if (goles.goles > 0) {
                let jsonGoles = {
                  futbolista: futbolista.nombre,
                  equipo: equipos.equipo.nombre,
                  goles: goles.goles,
                };

                tablaGoleo.push(jsonGoles);
              }
            }
          }
        }
      }
    }

    if (tablaGoleo.length > 0) {
      this.dataGoles = tablaGoleo.sort((x, y) => y.goles - x.goles);
    }
  }

  //Funcion para armar tabla de asistencias
  armarTablaAsistencias(liga: any): void {
    let tablaAsistencias = [];

    if (liga.golesAsistencias.length > 0) {
      for (let goles of liga.golesAsistencias) {
        let equiposTabla = liga.tablaGeneral.equipos;

        for (let equipos of equiposTabla) {
          let listaFutbolistas = equipos.equipo.futbolistas;

          for (let futbolista of listaFutbolistas) {
            if (futbolista.id === goles.futbolista) {
              if (goles.asistencias > 0) {
                let jsonAsistencias = {
                  futbolista: futbolista.nombre,
                  equipo: equipos.equipo.nombre,
                  asistencias: goles.asistencias,
                };

                tablaAsistencias.push(jsonAsistencias);
              }
            }
          }
        }
      }
    }

    if (tablaAsistencias.length > 0) {
      this.dataAsistencias = tablaAsistencias.sort((x, y) => y.asistencias - x.asistencias);
    }
  }

  //Funcion para armar tabla de tarjetas amarillas
  armarTablaAmarillas(liga: any): void {
    let tablaAmarillas = [];

    if (liga.tarjetas.length > 0) {
      for (let tarjetas of liga.tarjetas) {
        let equiposTabla = liga.tablaGeneral.equipos;

        for (let equipos of equiposTabla) {
          let listaFutbolistas = equipos.equipo.futbolistas;

          for (let futbolista of listaFutbolistas) {
            if (futbolista.id === tarjetas.futbolista) {
              if (tarjetas.amarillas > 0) {
                let jsonAmarillas = {
                  futbolista: futbolista.nombre,
                  equipo: equipos.equipo.nombre,
                  amarillas: tarjetas.amarillas,
                };

                tablaAmarillas.push(jsonAmarillas);
              }
            }
          }
        }
      }
    }

    if (tablaAmarillas.length > 0) {
      this.dataAmarillas = tablaAmarillas.sort((x, y) => y.amarillas - x.amarillas);
    }
  }

  //Funcion para armar tabla de tarjetas rojas
  armarTablaRojas(liga: any): void {
    let tablaRojas = [];

    if (liga.tarjetas.length > 0) {
      for (let tarjetas of liga.tarjetas) {
        let equiposTabla = liga.tablaGeneral.equipos;

        for (let equipos of equiposTabla) {
          let listaFutbolistas = equipos.equipo.futbolistas;

          for (let futbolista of listaFutbolistas) {
            if (futbolista.id === tarjetas.futbolista) {
              if (tarjetas.rojas > 0) {
                let jsonRojas = {
                  futbolista: futbolista.nombre,
                  equipo: equipos.equipo.nombre,
                  rojas: tarjetas.rojas,
                };

                tablaRojas.push(jsonRojas);
              }
            }
          }
        }
      }
    }

    if (tablaRojas.length > 0) {
      this.dataRojas = tablaRojas.sort((x, y) => y.rojas - x.rojas);
    }
  }

  //Funcion para armar tabla de jugadores mvp
  armarTablaMvp(liga: any): void {
    let tablaMvp = [];

    if (liga.jugadorMvp.length > 0) {
      for (let jugadorMvp of liga.jugadorMvp) {
        let equiposTabla = liga.tablaGeneral.equipos;

        for (let equipos of equiposTabla) {
          let listaFutbolistas = equipos.equipo.futbolistas;

          for (let futbolista of listaFutbolistas) {
            if (futbolista.id === jugadorMvp.futbolista) {
              let jsonMvp = {
                futbolista: futbolista.nombre,
                equipo: equipos.equipo.nombre,
                jornada: jugadorMvp.jornada,
              };

              tablaMvp.push(jsonMvp);
            }
          }
        }
      }
    }

    if (tablaMvp.length > 0) {
      this.dataMvp = tablaMvp.sort((x, y) => y.jornada - x.jornada);
    }
  }

  //Funciones para mostrar la tabla general
  public columnsTablaId = [
    {
      columnDef: 'nombre',
      header: 'Nombre Equipo',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.nombre}`,
    },
    {
      columnDef: 'puntos',
      header: 'Puntos',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.puntos}`,
    },
    {
      columnDef: 'victorias',
      header: 'Victorias',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.victorias}`,
    },
    {
      columnDef: 'empates',
      header: 'Empates',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.empates}`,
    },
    {
      columnDef: 'derrotas',
      header: 'Derrotas',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.derrotas}`,
    },
    {
      columnDef: 'golesFavor',
      header: 'Goles a Favor',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.golesFavor}`,
    },
    {
      columnDef: 'golesContra',
      header: 'Goles en Contra',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.golesContra}`,
    },
    {
      columnDef: 'diferenciaGoles',
      header: 'Diferencia',
      cell: (elementTabla: TablaGeneral) => `${elementTabla.diferenciaGoles}`,
    },
  ];
  public displayColumnsTablaId = this.columnsTablaId.map((c) => c.columnDef);

  //Funciones para mostrar resultados
  public columnsResultados = [
    {
      columnDef: 'jornada',
      header: 'Jornada',
      cell: (elementTabla: TablaResultados) => `${elementTabla.jornada}`,
    },
    {
      columnDef: 'fecha',
      header: 'Fecha',
      cell: (elementTabla: TablaResultados) => `${elementTabla.fecha}`,
    },
    {
      columnDef: 'hora',
      header: 'Hora',
      cell: (elementTabla: TablaResultados) => `${elementTabla.hora}`,
    },
    {
      columnDef: 'equipoLocal',
      header: 'Local',
      cell: (elementTabla: TablaResultados) => `${elementTabla.equipoLocal}`,
    },
    {
      columnDef: 'marcadorLocal',
      header: 'Marcador Local',
      cell: (elementTabla: TablaResultados) => `${elementTabla.marcadorLocal}`,
    },
    {
      columnDef: 'equipoVisita',
      header: 'Visitante',
      cell: (elementTabla: TablaResultados) => `${elementTabla.equipoVisita}`,
    },
    {
      columnDef: 'marcadorVisita',
      header: 'Marcador Visitante',
      cell: (elementTabla: TablaResultados) => `${elementTabla.marcadorVisita}`,
    },
  ];
  public displayColumnsResultados = this.columnsResultados.map((c) => c.columnDef);

  //Funciones para mostrar tabal de goleo
  public columnsGoles = [
    {
      columnDef: 'futbolista',
      header: 'Nombre Futbolista',
      cell: (elementTabla: TablaGoleo) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'equipo',
      header: 'Equipo',
      cell: (elementTabla: TablaGoleo) => `${elementTabla.equipo}`,
    },
    {
      columnDef: 'goles',
      header: 'Goles',
      cell: (elementTabla: TablaGoleo) => `${elementTabla.goles}`,
    },
  ];
  public displayColumnsGoles = this.columnsGoles.map((c) => c.columnDef);

  //Funciones para mostrar tabla de asistencias
  public columnsAsistencias = [
    {
      columnDef: 'futbolista',
      header: 'Nombre Futbolista',
      cell: (elementTabla: TablaAsistencias) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'equipo',
      header: 'Equipo',
      cell: (elementTabla: TablaAsistencias) => `${elementTabla.equipo}`,
    },
    {
      columnDef: 'asistencias',
      header: 'Asistencias',
      cell: (elementTabla: TablaAsistencias) => `${elementTabla.asistencias}`,
    },
  ];
  public displayColumnsAsistencias = this.columnsAsistencias.map((c) => c.columnDef);

  //Funciones para mostrar tabla de tarjetas amarillas
  public columnsAmarillas = [
    {
      columnDef: 'futbolista',
      header: 'Nombre Futbolista',
      cell: (elementTabla: TablaAmarillas) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'equipo',
      header: 'Equipo',
      cell: (elementTabla: TablaAmarillas) => `${elementTabla.equipo}`,
    },
    {
      columnDef: 'amarillas',
      header: 'Tarjetas Amarillas',
      cell: (elementTabla: TablaAmarillas) => `${elementTabla.amarillas}`,
    },
  ];
  public displayColumnsAmarillas = this.columnsAmarillas.map((c) => c.columnDef);

  //Funciones para mostrar tabla de tarjetas rojas
  public columnsRojas = [
    {
      columnDef: 'futbolista',
      header: 'Nombre Futbolista',
      cell: (elementTabla: TablaRojas) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'equipo',
      header: 'Equipo',
      cell: (elementTabla: TablaRojas) => `${elementTabla.equipo}`,
    },
    {
      columnDef: 'rojas',
      header: 'Tarjetas Rojas',
      cell: (elementTabla: TablaRojas) => `${elementTabla.rojas}`,
    },
  ];
  public displayColumnsRojas = this.columnsRojas.map((c) => c.columnDef);

  //Funciones para mostrar tabla de mvp
  public columnsMvp = [
    {
      columnDef: 'futbolista',
      header: 'Nombre Futbolista',
      cell: (elementTabla: TablaMvp) => `${elementTabla.futbolista}`,
    },
    {
      columnDef: 'equipo',
      header: 'Equipo',
      cell: (elementTabla: TablaMvp) => `${elementTabla.equipo}`,
    },
    {
      columnDef: 'jornada',
      header: 'MVP Jornada',
      cell: (elementTabla: TablaMvp) => `${elementTabla.jornada}`,
    },
  ];
  public displayColumnsMvp = this.columnsMvp.map((c) => c.columnDef);
}

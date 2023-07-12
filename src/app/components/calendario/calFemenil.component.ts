import { Component } from '@angular/core';
import { CalendarioComponent } from './calendario.component';
import { LigasService } from 'src/app/services/ligas.service';
import { HttpErrorResponse } from '@angular/common/http';

//Interfaz para trabajar tabla de partidos
export interface DataPartidos {
  jornada: number;
  fecha: string;
  hora: number;
  equipoLocal: string;
  equipoVisita: string;
}

@Component({
  selector: 'app-cal-femenil',
  templateUrl: './calFemenil.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioFemenilComponent {
  //Variables para validar front de administracion a mostrar
  public mostrarLigas: boolean | undefined;
  public mostrarPrincipal: boolean | undefined;
  //Variables para almacenar datos de ligas
  public dataLigas: any | undefined;
  public dataSelectLiga: any | undefined;
  public dataPartidos: any | undefined;

  //Constructor
  constructor(private calendario: CalendarioComponent, private ligaService: LigasService) {
    this.mostrarLigas = true;
    this.consultarLigas();
  }

  //Funcion para regresar al menu principal
  menuPrincipal(): void {
    this.calendario.principalFront();
  }

  //Funciones para mostrar front con ligas disponibles
  mostrarFrontLigas(): void {
    this.dataSelectLiga = undefined;
    this.dataPartidos = undefined;
    this.mostrarLigas = true;
    this.mostrarPrincipal = false;
  }

  //Funcion para mostrar front con las diferentes estadisticas de cada liga
  mostrarFrontPrincipal(): void {
    this.mostrarLigas = false;
    this.mostrarPrincipal = true;
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

  //Funcion para almacenar datos de la liga seleccionada
  selectLiga(select: any): void {
    this.dataSelectLiga = select;
    this.armarTablaPartidos(select);
    this.mostrarFrontPrincipal();
  }

  //Funcion para armar tabla de resultados
  armarTablaPartidos(liga: any): void {
    let tablaPartidos = [];

    if (liga.partidos.length > 0) {
      for (let partido of liga.partidos) {
        let jsonResultado = {
          equipoLocal: partido.equipoLocal.nombre,
          equipoVisita: partido.equipoVisitante.nombre,
          jornada: partido.jornada,
          fecha: partido.fecha,
          hora: partido.hora,
        };

        tablaPartidos.push(jsonResultado);
      }
    }

    if (tablaPartidos.length > 0) {
      this.dataPartidos = tablaPartidos.sort((x, y) => {
        if (x.jornada < y.jornada) {
          return -1;
        }

        if (x.jornada > y.jornada) {
          return 1;
        }

        return x.hora - y.hora;
      });
    }
  }

  //Funciones para mostrar tabla de Partidos
  public columnsPartido = [
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
    {
      columnDef: 'equipoLocal',
      header: 'Equipo Local',
      cell: (elementTabla: DataPartidos) => `${elementTabla.equipoLocal}`,
    },
    {
      columnDef: 'equipoVisita',
      header: 'Equipo Visitante',
      cell: (elementTabla: DataPartidos) => `${elementTabla.equipoVisita}`,
    },
  ];
  public displayColumnsPartido = this.columnsPartido.map((c) => c.columnDef);
}

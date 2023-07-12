import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent {
  //Variables para seccion de liga varonil
  public varonil: boolean | undefined;
  //Variables para seccion de liga femenil
  public femenil: boolean | undefined;

  //Constructor
  constructor() {}

  //Funciones para el manejo de fronts de liga varonil y femenil
  principalFront(): void {
    this.varonil = undefined;
    this.femenil = undefined;
  }

  varonilFront(): void {
    this.varonil = true;
    this.femenil = false;
  }

  femenilFront(): void {
    this.varonil = false;
    this.femenil = true;
  }
}

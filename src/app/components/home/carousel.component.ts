import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./home.component.scss'],
})
export class CarouselComponent {
  public dataImagenes = [
    {
      imagen: '../../../assets/images/backgrounds/futbol_0.jpg',
      titulo: 'SE PARTE DEL EQUIPO',
      descripcion: 'Te estamos esperando para que formes parte del equipo Flipendo',
      alt: 'imagen_0',
    },
    {
      imagen: '../../../assets/images/backgrounds/futbol_1.jpg',
      titulo: 'LIGA FLIPENDO',
      descripcion: 'Te estamos esperando para que formes parte del equipo Flipendo',
      alt: 'imagen_1',
    },
    {
      imagen: '../../../assets/images/backgrounds/futbol_2.jpg',
      titulo: 'CAMINO A LA FINAL',
      descripcion: 'Se acerca la final del America Championship',
      alt: 'imagen_2',
    },
  ];
}

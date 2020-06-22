import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public auth: AuthService) {}

  slides = [
    {
      img: 'assets/img/logo.png',
      titulo: 'Bienvenido'
    },
    {
      img: 'assets/img/gente.png',
      titulo: 'Práctica'
    },
    {
      img: 'assets/img/Estadisticas.png',
      titulo: 'Lleva estadisticas'
    }
  ];

}

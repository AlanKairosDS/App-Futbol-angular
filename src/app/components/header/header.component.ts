import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public objetoSession: any | undefined;
  public login: boolean | undefined;

  constructor(public authService: AuthenticationService) {}

  ngOnInit(): void {
    this.validarLogin();
    setInterval(() => {
      this.validarLogin();
    }, 5000);
  }

  validarLogin(): void {
    this.objetoSession = sessionStorage.getItem('Session');

    if (this.objetoSession !== null) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  logout(): void {
    this.authService.cerrarSesion();
  }
}

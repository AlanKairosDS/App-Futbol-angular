import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public usuario: string | undefined;
  public password: string | undefined;

  constructor(
    private _router: Router,
    public authService: AuthenticationService
  ) {}

  redireccion(): void {
    this._router.navigate(['/NuevaCuenta']);
  }

  mostrar_datos(): void {
    this.authService
      .iniciarSesion({
        username: this.usuario,
        password: this.password,
      })
      .subscribe(
        (data) => {
          sessionStorage.setItem('Session', JSON.stringify(data.data));
          this._router.navigate(['/Home']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          alert('Ocurrio un problema al iniciar sesion');
        }
      );
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  public usuario: string | undefined;
  public password: string | undefined;
  public headerError = 'Problemas al realizar Login';
  public messageError =
    'Los datos son incorrectos o ocurrio un problema de comunicación. Favor de intentar nuevamente.';

  constructor(private _router: Router, public authService: AuthenticationService, public dialog: MatDialog) {}

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
          let dialogSuccess = this.dialog.open(DialogComponent);
          dialogSuccess.componentInstance.header = 'Se realizo Login de forma Exitosa';
          dialogSuccess.componentInstance.message =
            'Se inicio sesion de forma correcta. Regresaremos a la pantalla de Inicio.';

          dialogSuccess.afterClosed().subscribe((result) => {
            this._router.navigate(['/Home']);
          });
        },
        (err: HttpErrorResponse) => {
          this.openDialog();
        }
      );
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogComponent);
    dialogRef.componentInstance.header = this.headerError;
    dialogRef.componentInstance.message = this.messageError;
  }
}

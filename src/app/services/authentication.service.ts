import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _router: Router, private http: HttpClient, public dialog: MatDialog) {}

  iniciarSesion(request: any): Observable<any> {
    return this.http.post(environment.url_Login + '/msvc-login/api/auth/iniciar-sesion', request);
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('Session');

    let dialogSuccess = this.dialog.open(DialogComponent);
    dialogSuccess.componentInstance.header = 'Se realizo Logout de forma Exitosa';
    dialogSuccess.componentInstance.message =
      'Se cerro sesion de forma correcta. Regresaremos a la pantalla de Inicio.';

    dialogSuccess.afterClosed().subscribe((result) => {
      this._router.navigate(['/Home']);
    });
  }

  nuevaCuenta(request: any): Observable<any> {
    return this.http.post(environment.url_Login + '/msvc-login/api/auth/registrar-usuario', request);
  }
}

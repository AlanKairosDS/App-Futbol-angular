import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private _router: Router, private http: HttpClient) {}

  iniciarSesion(request: any): Observable<any> {
    return this.http.post(
      'http://localhost:8002/msvc-login/api/auth/iniciar-sesion',
      request
    );
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('Session');
    this._router.navigate(['/Home']);
  }

  nuevaCuenta(request: any): Observable<any> {
    return this.http.post(
      'http://localhost:8002/msvc-login/api/auth/registrar-usuario',
      request
    );
  }
}

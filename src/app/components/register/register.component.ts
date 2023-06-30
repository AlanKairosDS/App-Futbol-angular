import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public usuario = new FormControl('', [
    Validators.required,
    Validators.pattern('[a-zA-Z0-9]{6,15}'),
  ]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public hide = true;
  public password = new FormControl('', [
    Validators.required,
    Validators.pattern(
      '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$*&])[A-Za-zd$@$*&].{8,15}'
    ),
  ]);

  constructor(
    private _router: Router,
    public authService: AuthenticationService
  ) {}

  public newForm = new FormGroup({
    usuario: this.usuario,
    email: this.email,
    password: this.password,
  });

  getErrorUsuario() {
    if (this.usuario.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.usuario.hasError('pattern') ? 'Usuario no valido' : '';
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  getErrorPassword() {
    if (this.password.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.password.hasError('pattern') ? 'Password no valido' : '';
  }

  mostrar_datos(): void {
    this.authService
      .nuevaCuenta({
        username: this.usuario.value,
        email: this.email.value,
        password: this.password.value,
      })
      .subscribe(
        (data) => {
          this._router.navigate(['/Login']);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
          alert('Ocurrio un problema al crear nueva cuenta');
        }
      );
  }
}

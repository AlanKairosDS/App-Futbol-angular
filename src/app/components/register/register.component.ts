import { Component } from '@angular/core';
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

  public newForm = new FormGroup({
    usuario: this.usuario,
    email: this.email,
    password: this.password,
  });

  mostrar_datos(): void {
    console.log(this.usuario.value);
    console.log(this.email.value);
    console.log(this.password.value);
  }

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
}

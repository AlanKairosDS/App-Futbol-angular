import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.scss'],
})
export class ContactoComponent {
  public nombre = new FormControl('', [Validators.required]);
  public email = new FormControl('', [Validators.required, Validators.email]);
  public telefono = new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]);
  public comentarios = new FormControl('', [Validators.required]);

  public newForm = new FormGroup({
    nombre: this.nombre,
    email: this.email,
    telefono: this.telefono,
    comentarios: this.comentarios,
  });

  mostrar_datos(): void {
    console.log(this.nombre.value);
    console.log(this.email.value);
    console.log(this.telefono.value);
    console.log(this.comentarios.value);
  }

  getErrorNombre() {
    if (this.nombre.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }

  getErrorEmail() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Email no valido' : '';
  }

  getErrorTelefono() {
    if (this.telefono.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.telefono.hasError('pattern') ? 'Telefono no valido' : '';
  }

  getErrorComentarios() {
    if (this.comentarios.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return '';
  }
}

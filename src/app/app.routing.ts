//Importar los modulos del routing de angular
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes a los cuales se les quiere hacer una pagina exclusiva
import { HomeComponent } from './components/home/home.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ReglamentoComponent } from './components/reglamento/reglamento.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'NuevaCuenta', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Reglamento', component: ReglamentoComponent },
  { path: 'Estadisticas', component: EstadisticasComponent },
  { path: 'ProximosPartidos', component: CalendarioComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: '**', component: ErrorComponent },
];

//Se exporta el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> =
  RouterModule.forRoot(appRoutes);

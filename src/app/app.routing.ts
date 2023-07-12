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
import { FutbolistasComponent } from './components/futbolistas/futbolistas.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { LigaComponent } from './components/liga/liga.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'NuevaCuenta', component: RegisterComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Reglamento', component: ReglamentoComponent },
  { path: 'Estadisticas', component: EstadisticasComponent },
  { path: 'Partidos', component: CalendarioComponent },
  { path: 'Contacto', component: ContactoComponent },
  { path: 'AdministraFutbolistas', component: FutbolistasComponent },
  { path: 'AdministraEquipos', component: EquiposComponent },
  { path: 'AdministraPartidos', component: PartidosComponent },
  { path: 'AdministraResultados', component: ResultadosComponent },
  { path: 'AdministraTablaGeneral', component: TablaComponent },
  { path: 'AdministraLigas', component: LigaComponent },
  { path: '**', component: ErrorComponent },
];

//Se exporta el modulo de rutas
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);

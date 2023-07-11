import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { AuthenticationService } from './services/authentication.service';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { ReglamentoComponent } from './components/reglamento/reglamento.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ErrorComponent } from './components/error/error.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { FutbolistasComponent } from './components/futbolistas/futbolistas.component';
import { EquiposComponent } from './components/equipos/equipos.component';
import { PartidosComponent } from './components/partidos/partidos.component';
import { ResultadosComponent } from './components/resultados/resultados.component';
import { TablaComponent } from './components/tabla/tabla.component';
import { LigaComponent } from './components/liga/liga.component';
import { VaronilComponent } from './components/varonil/varonil.component';
import { FemenilComponent } from './components/femenil/femenil.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CalendarioComponent,
    ContactoComponent,
    EstadisticasComponent,
    ReglamentoComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    DialogComponent,
    FutbolistasComponent,
    EquiposComponent,
    PartidosComponent,
    ResultadosComponent,
    TablaComponent,
    LigaComponent,
    VaronilComponent,
    FemenilComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    routing,
  ],
  providers: [appRoutingProviders, AuthenticationService],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

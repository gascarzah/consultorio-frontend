

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';

import { PagesRoutingModule } from './pages-routing.module';
import { LayoutComponent } from './layout/layout.component';

import { HistoriaClinicaComponent } from './historia-clinica/historia-clinica.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { HistoriaClinicaEdicionComponent } from './historia-clinica/historia-clinica-edicion/historia-clinica-edicion.component';
import { ConsultaEdicionComponent } from './consulta/consulta-edicion/consulta-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { ProgramacionEdicionComponent } from './programacion/programacion-edicion/programacion-edicion.component';
import { MedicoComponent } from './medico/medico.component';
import { MedicoEdicionComponent } from './medico/medico-edicion/medico-edicion.component';
import { CitaComponent } from './cita/cita.component';



@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    // FlexLayoutModule,
    // PdfViewerModule,
    PagesRoutingModule
  ],
  exports: [],
  declarations: [

    LayoutComponent,
    HistoriaClinicaComponent,
    ProgramacionComponent,
    TratamientoComponent,
    ConsultaComponent,
    ConsultaEdicionComponent,
    HistoriaClinicaEdicionComponent,
    PacienteComponent,
    PacienteEdicionComponent,
    ProgramacionEdicionComponent,
    MedicoComponent,
    MedicoEdicionComponent,
    CitaComponent

  ],
  providers: [],
})
export class PagesModule { }

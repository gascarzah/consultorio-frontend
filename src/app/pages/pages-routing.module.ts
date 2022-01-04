import { MedicoEdicionComponent } from './medico/medico-edicion/medico-edicion.component';
import { MedicoComponent } from './medico/medico.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { PacienteEdicionComponent } from './paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ConsultaComponent } from './consulta/consulta.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgramacionEdicionComponent } from './programacion/programacion-edicion/programacion-edicion.component';

// import { GuardService } from '../_service/guard.service';



const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent },
    ]
  },
  {
    path: 'medico', component: MedicoComponent, children: [
      { path: 'nuevo', component: MedicoEdicionComponent },
      { path: 'edicion/:id', component: MedicoEdicionComponent },
    ]
  },
  {
    path: 'consulta', component: ConsultaComponent
  },
  {
    path: 'programacion', component: ProgramacionComponent
  },
  {
    path: 'programacion/nuevo', component: ProgramacionEdicionComponent
  },

  // { path: 'not-403', component: Not403Component },
  //  { path: 'not-404', component: Not404Component },
  {
    path: '**',
    redirectTo: 'not-404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

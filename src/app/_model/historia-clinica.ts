import {  Medico } from './medico';
import { Paciente } from './paciente';


export class HistoriaClinica {
  idHistoriaClinica: number = 0;
  ectoscopia: string = ""
  motivo: string = ""
  antecedentesMedicos: string = ""
  paciente!: Paciente
  medico!: Medico
}

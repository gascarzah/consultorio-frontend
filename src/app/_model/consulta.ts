
import { Paciente } from './paciente';
import { Programacion } from './programacion';
export class Consulta {
  idConsulta: number = 0;
  programacion!: Programacion
  paciente!: Paciente;
}

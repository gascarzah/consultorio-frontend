import {  Medico } from './medico';

export class Programacion{
  idProgramacion!: number;
  dia: number=0;
  horario: string = ""
  fecha: Date = new Date()
  medico: Medico = new Medico()
}

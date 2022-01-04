import { HistoriaClinica } from './historia-clinica';
import { Tratamiento } from "./tratamiento";

export class HistoriaClinicaDetalle {
  idHistoriaClinicaDetalle: number = 0;
  tratamiento!: Tratamiento
  pagado: boolean = false;
  historiaClinica!: HistoriaClinica
}

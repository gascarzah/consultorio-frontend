import { HistoriaClinicaDetalle } from './../_model/historia-clinica-detalle';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HistoriaClinicaDetalleService extends GenericService<HistoriaClinicaDetalle>{

  historiaclinicadetalleCambio = new Subject<HistoriaClinicaDetalle[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/historiaclinicadetalles`);
 }

 listarPageable(p: number, s:number){
   return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
 }

 /* get, set */
 setMensajeCambio(mensaje: string){
   this.mensajeCambio.next(mensaje);
 }

 getMensajeCambio(){
   return this.mensajeCambio.asObservable();
 }

 setHistoriaClinicaDetalleCambio(lista: HistoriaClinicaDetalle[]){
   this.historiaclinicadetalleCambio.next(lista);
 }

 getHistoriaClinicaDetalleCambio(){
   return this.historiaclinicadetalleCambio.asObservable();
 }




}

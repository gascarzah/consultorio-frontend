import { HistoriaClinica } from './../_model/historia-clinica';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HistoriaClinicaService extends GenericService<HistoriaClinica>{

  historiaClinicaCambio = new Subject<HistoriaClinica[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/historiaclinicas`);
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

 setHistoriaClinicaCambio(lista: HistoriaClinica[]){
   this.historiaClinicaCambio.next(lista);
 }

 getHistoriaClinicaCambio(){
   return this.historiaClinicaCambio.asObservable();
 }




}

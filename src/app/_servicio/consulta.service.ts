import { Consulta } from './../_model/consulta';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ConsultaService extends GenericService<Consulta>{

  consultaCambio = new Subject<Consulta[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/consultas`);
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

 setConsultaCambio(lista: Consulta[]){
   this.consultaCambio.next(lista);
 }

 getConsultaCambio(){
   return this.consultaCambio.asObservable();
 }




}

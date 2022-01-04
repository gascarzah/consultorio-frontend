import { Medico } from './../_model/medico';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class MedicoService extends GenericService<Medico>{

  medicoCambio = new Subject<Medico[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/medicos`);
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

 setMedicoCambio(lista: Medico[]){
   this.medicoCambio.next(lista);
 }

 getMedicoCambio(){
   return this.medicoCambio.asObservable();
 }




}

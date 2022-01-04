import { Paciente } from '../_model/paciente';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PacienteService extends GenericService<Paciente>{

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/pacientes`);
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

 setPacienteCambio(lista: Paciente[]){
   this.pacienteCambio.next(lista);
 }

 getPacienteCambio(){
   return this.pacienteCambio.asObservable();
 }




}

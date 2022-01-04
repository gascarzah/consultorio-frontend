import { Tratamiento } from './../_model/tratamiento';
import { GenericService } from './generic.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class TratamientoService extends GenericService<Tratamiento>{

  tratamientoCambio = new Subject<Tratamiento[]>();
  mensajeCambio = new Subject<string>();

 constructor(protected http: HttpClient) {
   super(
     http,
     `${environment.HOST}/tratamientos`);
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

 setTratamientoCambio(lista: Tratamiento[]){
   this.tratamientoCambio.next(lista);
 }

 getTratamientoCambio(){
   return this.tratamientoCambio.asObservable();
 }




}

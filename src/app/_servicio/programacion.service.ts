import { Programacion } from './../_model/programacion';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService extends GenericService<Programacion>{

  private programacionCambio = new Subject<Programacion[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected http: HttpClient) {
    super(
      http,
      `${environment.HOST}/programaciones`);
  }

  listarPageable(p: number, s:number){
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  // /* get, set */
  setMensajeCambio(mensaje: string){
    this.mensajeCambio.next(mensaje);
  }

  getMensajeCambio(){
    return this.mensajeCambio.asObservable();
  }

  setProgramacionCambio(lista: Programacion[]){
    this.programacionCambio.next(lista);
  }

  getProgramacionCambio(){
    return this.programacionCambio.asObservable();
  }


}

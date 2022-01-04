import { Turno } from './../../../_dto/turno';
import { Dia } from './../../../_dto/dia';

import { MedicoService } from './../../../_servicio/medico.service';
import {  Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { Medico } from './../../../_model/medico';
import { map } from 'rxjs/operators';


@Component({

  selector: 'app-programacion-edicion',
  templateUrl: './programacion-edicion.component.html',
  styleUrls: ['./programacion-edicion.component.css']
})
export class ProgramacionEdicionComponent implements OnInit {

  arrDias: Dia[] = [
    { numero: 1, nombre: 'lunes', checked: false},
    { numero: 2, nombre: 'martes', checked: false},
    { numero: 3, nombre: 'miercoles', checked: false},
    { numero: 4, nombre: 'jueves', checked: false},
    { numero: 5, nombre: 'viernes', checked: false},
    { numero: 6, nombre: 'sabado', checked: false},
  ]

  turnos:Turno[] =  [{ nombre: '8:00 - 11:00', checked: false }, { nombre: '12:00 - 17:00', checked: false }, { nombre: '18:00 - 20:00', checked: false }]


  form: FormGroup
  myControlMedico: FormControl = new FormControl()

  medicos: Medico[]
  medicosFiltrados$: Observable<Medico[]>
  constructor(private fb: FormBuilder,
    private medicoService: MedicoService) { }

  ngOnInit(): void {
    this.initForm()

    this.listarMedicos()

    this.medicosFiltrados$ = this.myControlMedico.valueChanges.pipe(map(val => this.filtrarMedicos(val)));

  }

  initForm() {

    const dias = new FormArray([]);
    this.arrDias.forEach((dia: Dia) => {
      const turnos = new FormArray([]);
      this.turnos.forEach((turno: Turno) => {
        turnos.push(
          new FormGroup({
            nombre: new FormControl(turno.nombre),
            checked: new FormControl(turno.checked),
          })
        );
      });

      dias.push(
        new FormGroup({
          nombre: new FormControl(dia.nombre),
          checked: new FormControl(dia.checked),
          turnos,
        })
      );
    });


    this.form = this.fb.group({
      'medico': this.myControlMedico,
      'tiempoCita': new FormControl('20'),
      'todos': Boolean,
      dias: dias
    })

    this.setListeners();
  }



  initTurno(selturno: Turno){
    return new FormGroup({
      turno: new FormControl(selturno),
    })
  }

  get diaFormArray(): FormArray {
    return this.form.get('dias') as FormArray;
  }
  getDiaTurnoArray(diaIndex: number): FormArray {
    return this.diaFormArray.at(diaIndex).get('turnos') as FormArray;
  }


  private setListeners(): void {
    this.diaFormArray.controls.forEach((diaGroup: FormGroup) => {
      diaGroup.controls['checked'].valueChanges.subscribe((value) => {
        (
          (diaGroup.controls['turnos'] as FormArray).controls as FormGroup[]
        ).forEach((turnoGroup: FormGroup) => {
          turnoGroup.controls['checked'].setValue(value);
        });
      });
    });
  }



  listarMedicos() {
    this.medicoService.listar().subscribe(data => {
      this.medicos = data
      console.log(data)
    })
  }
  getNombreDia(i: number) {
    // console.log(this.diaFormArray)
    return this.diaFormArray.controls[i].value['nombre']
  }
  getNumeroDia(i: number) {
    return this.diaFormArray.controls[i].value['numero']
  }
  getCheckedDia(i: number) {
    return this.diaFormArray.controls[i].value['checked']
  }
  getNombreTurno(i: number) {
    // console.log(diaFormArray.controls[i].value['turno'])
    return this.diaFormArray.controls[i].value['turno'].nombre
  }
  filtrarMedicos(val: any) {
    if (val && val.idMedico > 0) {
      return this.medicos.filter(el =>
        el.nombres.toLowerCase().includes(val.nombres.toLowerCase()) || el.apellidoPaterno.toLowerCase().includes(val.apellidoPaterno.toLowerCase()) || el.apellidoMaterno.toLowerCase().includes(val.apellidoMaterno.toLowerCase()) || el.dni.includes(val.dni)
      );
    }
    return this.medicos.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase()) || el.apellidoPaterno.toLowerCase().includes(val?.toLowerCase()) || el.apellidoMaterno.toLowerCase().includes(val?.toLowerCase()) || el.dni.includes(val)
    );
  }

  mostrarMedico(val: any) {
    console.log(val)
    return val ? `${val.apellidoPaterno} ${val.apellidoMaterno} ${val.nombres} ` : val;
  }

}

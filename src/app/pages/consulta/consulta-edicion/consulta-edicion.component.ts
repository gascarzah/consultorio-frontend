import { PacienteService } from './../../../_servicio/paciente.service';
import { Medico } from './../../../_model/medico';


import { map, switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_servicio/consulta.service';
import { Observable } from 'rxjs';
import { Paciente } from 'src/app/_model/paciente';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-consulta-edicion',
  templateUrl: './consulta-edicion.component.html',
  styleUrls: ['./consulta-edicion.component.css']
})
export class ConsultaEdicionComponent implements OnInit {
  habilitado: boolean = true
  flag: boolean = false
  mensaje: string;
  maxFecha: Date = new Date();
  nombreArchivo: string;
  archivosSeleccionados: FileList;
  pacientes$: Observable<Paciente[]>
  medicos$: Observable<Medico[]>
  myControlPaciente: FormControl = new FormControl();
  pacientesFiltrados$: Observable<Paciente[]>;
  pacientes: Paciente[]
  form: FormGroup

  constructor(
    public dialogRef: MatDialogRef<ConsultaEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta,
    protected consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    private pacienteService: PacienteService,
    private fb: FormBuilder,) {

    if (this.data.idConsulta == null) {
      this.habilitado = false
    } else {
      this.habilitado = true
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({

      'paciente': this.myControlPaciente,


    })

    this.listarPacientes()
    this.pacientesFiltrados$ = this.myControlPaciente.valueChanges.pipe(map(val => this.filtrarPacientes(val)));

  }

  mostrarPaciente(val: any) {
    return val ? `${val.apellidoPaterno} ${val.apellidoMaterno} ${val.nombres} ` : val;
  }


  getPacientes() {
    this.pacientes$ = this.pacienteService.listar()
  }


  registrar(): void {

    if (this.validacion(this.data)) {
      if (this.data.idConsulta == undefined) {
        this.consultaService.registrar(this.data).pipe(switchMap(() => {
          return this.consultaService.listar();
        })).subscribe(data => {
          this.consultaService.consultaCambio.next(data);
          this.consultaService.mensajeCambio.next('SE REGISTRO');
        });
      } else {
        this.consultaService.modificar(this.data).subscribe(() => {
          this.consultaService.listar().subscribe(data => {
            this.consultaService.setConsultaCambio(data);
            this.consultaService.setMensajeCambio('SE MODIFICÓ');
          });
        });
      }
      this.dialogRef.close();
    }
  }

  validacion(data: Consulta) {

    // if(!data.nombre){
    //   this.mensaje = `Debe agregar un ruc`;
    //   this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    //   return false
    // }
    // else if(!data.apellidoPaterno){
    //   this.mensaje = `Ingresar el apellido paterno`;
    //   this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    //   return false
    // }else if(!data.apellidoMaterno){
    //   this.mensaje = `Ingresar el apellido materno`;
    //   this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
    //   return false
    // }

    return true

  }


  listarPacientes() {
    this.pacienteService.listar().subscribe(data => {
      this.pacientes = data;
    });
  }

  filtrarPacientes(val: any) {
    if (val != null && val.idPaciente > 0) {
      return this.pacientes.filter(el =>
        el.nombres.toLowerCase().includes(val.nombre.toLowerCase())
      );
      //EMPTY de RxJS
    }
    return this.pacientes.filter(el =>
      el.nombres.toLowerCase().includes(val?.toLowerCase())
    );
  }

  keyPressAlpha(event: any) {

    var inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  // Only Integer Numbers
  keyPressNumbers(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  // Only AlphaNumeric with Some Characters [-_ ]
  keyPressAlphaNumericWithCharacters(event: any) {

    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[a-zA-Z0-9-_. ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }


}


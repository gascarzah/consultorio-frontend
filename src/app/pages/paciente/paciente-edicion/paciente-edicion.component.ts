import { Paciente } from './../../../_model/paciente';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { PacienteService } from 'src/app/_servicio/paciente.service';

@Component({
  selector: 'app-paciente-edicion',
  templateUrl: './paciente-edicion.component.html',
  styleUrls: ['./paciente-edicion.component.css']
})
export class PacienteEdicionComponent implements OnInit {
  habilitado: boolean = true
  flag : boolean = false
  mensaje: string;
  maxFecha: Date = new Date();
  nombreArchivo: string;
  archivosSeleccionados: FileList;

  constructor(
    public dialogRef: MatDialogRef<PacienteEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Paciente,
    protected pacienteService: PacienteService,
    private snackBar: MatSnackBar) {

      if(this.data.idPaciente == null){
        this.habilitado = false
      }else{
        this.habilitado = true
      }
    }


    ngOnInit(): void {

    }

  registrar(): void {

    if(this.validacion(this.data)){
      if(this.data.idPaciente == undefined){
        this.pacienteService.registrar(this.data).pipe(switchMap(() => {
        return this.pacienteService.listar();
      })).subscribe(data => {
        this.pacienteService.pacienteCambio.next(data);
        this.pacienteService.mensajeCambio.next('SE REGISTRO');
      });
      }else{
        this.pacienteService.modificar(this.data).subscribe(() => {
          this.pacienteService.listar().subscribe(data => {
            this.pacienteService.setPacienteCambio(data);
            this.pacienteService.setMensajeCambio('SE MODIFICÓ');
          });
        });
      }
      this.dialogRef.close();
    }
  }

  validacion(data: Paciente){

    if(!data.nombres){
      this.mensaje = `Debe ingresar los nombres`;
      this.snackBar.open(this.mensaje, "Aviso", { duration: 2000 });
      return false
    }
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


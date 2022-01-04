import { Medico } from './../../../_model/medico';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MedicoService } from 'src/app/_servicio/medico.service';

@Component({
  selector: 'app-medico-edicion',
  templateUrl: './medico-edicion.component.html',
  styleUrls: ['./medico-edicion.component.css']
})
export class MedicoEdicionComponent implements OnInit {
  habilitado: boolean = true
  flag : boolean = false
  mensaje: string;
  maxFecha: Date = new Date();
  nombreArchivo: string;
  archivosSeleccionados: FileList;

  constructor(
    public dialogRef: MatDialogRef<MedicoEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico,
    protected medicoService: MedicoService,
    private snackBar: MatSnackBar) {

      if(this.data.idMedico == null){
        this.habilitado = false
      }else{
        this.habilitado = true
      }
    }


    ngOnInit(): void {

    }

  registrar(): void {

    if(this.validacion(this.data)){
      if(this.data.idMedico == undefined){
        this.medicoService.registrar(this.data).pipe(switchMap(() => {
        return this.medicoService.listar();
      })).subscribe(data => {
        this.medicoService.medicoCambio.next(data);
        this.medicoService.mensajeCambio.next('SE REGISTRO');
      });
      }else{
        this.medicoService.modificar(this.data).subscribe(() => {
          this.medicoService.listar().subscribe(data => {
            this.medicoService.setMedicoCambio(data);
            this.medicoService.setMensajeCambio('SE MODIFICÓ');
          });
        });
      }
      this.dialogRef.close();
    }
  }

  validacion(data: Medico){

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


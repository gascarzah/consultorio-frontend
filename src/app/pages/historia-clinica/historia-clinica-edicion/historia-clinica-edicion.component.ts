import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HistoriaClinica } from 'src/app/_model/historia-clinica';
import { HistoriaClinicaService } from 'src/app/_servicio/historia-clinica.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-historia-clinica-edicion',
  templateUrl: './historia-clinica-edicion.component.html',
  styleUrls: ['./historia-clinica-edicion.component.css']
})
export class HistoriaClinicaEdicionComponent implements OnInit {
  habilitado: boolean = true
  flag : boolean = false
  mensaje: string;
  constructor(public dialogRef: MatDialogRef<HistoriaClinicaEdicionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: HistoriaClinica,
    protected historiaClinicaService: HistoriaClinicaService,
    private snackBar: MatSnackBar) {
      if(this.data.idHistoriaClinica == null){
        this.habilitado = false
      }else{
        this.habilitado == true
      }

    }

  ngOnInit(): void {
  }

  registrar(): void {

    if(this.validacion(this.data)){
      if(this.data.idHistoriaClinica == undefined){
        this.historiaClinicaService.registrar(this.data).pipe(switchMap(() => {
        return this.historiaClinicaService.listar();
      })).subscribe(data => {
        this.historiaClinicaService.historiaClinicaCambio.next(data);
        this.historiaClinicaService.mensajeCambio.next('SE REGISTRO');
      });
      }else{
        this.historiaClinicaService.modificar(this.data).subscribe(() => {
          this.historiaClinicaService.listar().subscribe(data => {
            this.historiaClinicaService.setHistoriaClinicaCambio(data);
            this.historiaClinicaService.setMensajeCambio('SE MODIFICÓ');
          });
        });
      }
      this.dialogRef.close();
    }
  }

  validacion(data: HistoriaClinica){

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

}

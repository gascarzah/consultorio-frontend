import { Programacion } from './../../_model/programacion';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { ProgramacionService } from 'src/app/_servicio/programacion.service';
import { ProgramacionEdicionComponent } from './programacion-edicion/programacion-edicion.component';
@Component({
  selector: 'app-programacion',
  templateUrl: './programacion.component.html',
  styleUrls: ['./programacion.component.css']
})
export class ProgramacionComponent implements OnInit {
  displayedColumns = ['fecha', 'horario', 'medico',  'activo', 'acciones'];
  dataSource!: MatTableDataSource<Programacion>;




  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cantidad: number = 0;

  dni: string
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  celular: string
  telefono: string


  constructor(
    private programacionService: ProgramacionService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.programacionService.getProgramacionCambio().subscribe(data => {

      this.crearTabla(data);
    });

    this.programacionService.getMensajeCambio().subscribe(data => {

      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.programacionService.listarPageable(0, 5).subscribe(data => {

      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });


  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  crearTabla(data: Programacion[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(id: number) {
    this.programacionService.eliminar(id).pipe(switchMap(() => {
      return this.programacionService.listar();
    })).subscribe(data => {
      this.programacionService.setProgramacionCambio(data);
      this.programacionService.setMensajeCambio('SE ELIMINO');
    });
  }

  mostrarMas(e: any) {
    this.programacionService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(ProgramacionEdicionComponent, {
      width: '500px',
      // height: '600px',
      maxHeight: '600px',
      data: {
        dni: this.dni,
        nombres: this.nombres,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        celular: this.celular,
        telefono: this.telefono
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed  ${result}`);
    });
  }

  openDialogMod(element: any): void {
    console.log
    const dialogRef = this.dialog.open(ProgramacionEdicionComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {
        idProgramacion: element.idProgramacion,
        dni: element.dni,
        nombres: element.nombres,
        apellidoPaterno: element.apellidoPaterno,
        apellidoMaterno: element.apellidoMaterno,
        celular: element.celular,
        telefono: element.telefono
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed  ${result}`);

    });

  }


}

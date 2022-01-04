import { MedicoEdicionComponent } from './medico-edicion/medico-edicion.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { MedicoService } from 'src/app/_servicio/medico.service';
import { Medico } from 'src/app/_model/medico';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {
  displayedColumns = ['medico', 'dni', 'telefono', 'celular', 'activo', 'acciones'];
  dataSource!: MatTableDataSource<Medico>;
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
    private medicoService: MedicoService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.medicoService.getMedicoCambio().subscribe(data => {

      this.crearTabla(data);
    });

    this.medicoService.getMensajeCambio().subscribe(data => {

      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.medicoService.listarPageable(0, 5).subscribe(data => {

      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });


  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  crearTabla(data: Medico[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(id: number) {
    this.medicoService.eliminar(id).pipe(switchMap(() => {
      return this.medicoService.listar();
    })).subscribe(data => {
      this.medicoService.setMedicoCambio(data);
      this.medicoService.setMensajeCambio('SE ELIMINO');
    });
  }

  mostrarMas(e: any) {
    this.medicoService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(MedicoEdicionComponent, {
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
    const dialogRef = this.dialog.open(MedicoEdicionComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {
        idMedico: element.idMedico,
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

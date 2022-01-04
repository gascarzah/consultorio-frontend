import { PacienteEdicionComponent } from './paciente-edicion/paciente-edicion.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { PacienteService } from 'src/app/_servicio/paciente.service';
import { Paciente } from 'src/app/_model/paciente';
@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {
  displayedColumns = ['paciente', 'dni', 'telefono', 'celular', 'activo', 'acciones'];
  dataSource!: MatTableDataSource<Paciente>;
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
    private pacienteService: PacienteService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.pacienteService.getPacienteCambio().subscribe(data => {

      this.crearTabla(data);
    });

    this.pacienteService.getMensajeCambio().subscribe(data => {

      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.pacienteService.listarPageable(0, 5).subscribe(data => {

      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });


  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  crearTabla(data: Paciente[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(id: number) {
    this.pacienteService.eliminar(id).pipe(switchMap(() => {
      return this.pacienteService.listar();
    })).subscribe(data => {
      this.pacienteService.setPacienteCambio(data);
      this.pacienteService.setMensajeCambio('SE ELIMINO');
    });
  }

  mostrarMas(e: any) {
    this.pacienteService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(PacienteEdicionComponent, {
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
    const dialogRef = this.dialog.open(PacienteEdicionComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {
        idPaciente: element.idPaciente,
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

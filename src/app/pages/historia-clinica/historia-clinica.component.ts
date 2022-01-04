import { HistoriaClinicaService } from './../../_servicio/historia-clinica.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HistoriaClinica } from 'src/app/_model/historia-clinica';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { switchMap } from 'rxjs/operators';
import { HistoriaClinicaEdicionComponent } from './historia-clinica-edicion/historia-clinica-edicion.component';

@Component({
  selector: 'app-historia-clinica',
  templateUrl: './historia-clinica.component.html',
  styleUrls: ['./historia-clinica.component.css']
})
export class HistoriaClinicaComponent implements OnInit {
  displayedColumns = ['paciente', 'edad', 'direccion', 'telefono', 'celular', 'medico'];
  dataSource: MatTableDataSource<HistoriaClinica>
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort!: MatSort;
  cantidad: number = 0;
  nombre!: string
  descripcion!: string
  activo!: boolean
  constructor(
    private historiaclinicaService: HistoriaClinicaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.historiaclinicaService.getHistoriaClinicaCambio().subscribe(data => {

      this.crearTabla(data);
    });

    this.historiaclinicaService.getMensajeCambio().subscribe(data => {

      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.historiaclinicaService.listarPageable(0, 5).subscribe(data => {

      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });


  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  crearTabla(data: HistoriaClinica[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(id: number) {
    this.historiaclinicaService.eliminar(id).pipe(switchMap(() => {
      return this.historiaclinicaService.listar();
    })).subscribe(data => {
      this.historiaclinicaService.setHistoriaClinicaCambio(data);
      this.historiaclinicaService.setMensajeCambio('SE ELIMINO');
    });
  }

  mostrarMas(e: any) {
    this.historiaclinicaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(HistoriaClinicaEdicionComponent, {
      width: '500px',
      // height: '600px',
      maxHeight: '600px',
      data: {
        nombre: this.nombre,
        descripcion: this.descripcion,
        activo: this.activo
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed  ${result}`);
    });
  }

  openDialogMod(element: any): void {

    const dialogRef = this.dialog.open(HistoriaClinicaEdicionComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {
        idHistoriaClinica: element.idHistoriaClinica,
        nombre: element.nombre,
        descripcion: element.descripcion,
        activo: element.activo
      }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log(`The dialog was closed  ${result}`);

    });

  }


}


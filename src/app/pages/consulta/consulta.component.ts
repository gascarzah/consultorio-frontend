
import { switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatPaginator } from '@angular/material/paginator';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ConsultaEdicionComponent } from './consulta-edicion/consulta-edicion.component';
import { Consulta } from 'src/app/_model/consulta';
import { ConsultaService } from 'src/app/_servicio/consulta.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaComponent implements OnInit {

  displayedColumns = ['consulta', 'persona', 'programacion', 'acciones'];
  dataSource: MatTableDataSource<Consulta>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  cantidad: number = 0;
  nombre: string
  descripcion: string
  activo: boolean

  constructor(
    private consultaService: ConsultaService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consultaService.getConsultaCambio().subscribe(data => {

      this.crearTabla(data);
    });

    this.consultaService.getMensajeCambio().subscribe(data => {

      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.consultaService.listarPageable(0, 5).subscribe(data => {

      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });


  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  crearTabla(data: Consulta[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminar(id: number) {
    this.consultaService.eliminar(id).pipe(switchMap(() => {
      return this.consultaService.listar();
    })).subscribe(data => {
      this.consultaService.setConsultaCambio(data);
      this.consultaService.setMensajeCambio('SE ELIMINO');
    });
  }

  mostrarMas(e: any){
    this.consultaService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
    });
  }
  openDialog(): void {

    const dialogRef = this.dialog.open(ConsultaEdicionComponent, {
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

    const dialogRef = this.dialog.open(ConsultaEdicionComponent, {
      width: '500px',
      maxHeight: '600px',
      data: {idConsulta: element.idConsulta,
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



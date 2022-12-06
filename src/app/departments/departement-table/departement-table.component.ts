import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DepartementDialogComponent } from '../departement-dialog/departement-dialog.component';
import { DepartementsAssignDialogComponent } from '../departements-assign-dialog/departements-assign-dialog.component';
import { departmentsService } from 'src/app/shared/departments.service';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-departement-table',
  templateUrl: './departement-table.component.html',
  styleUrls: ['./departement-table.component.css'],
})
export class DepartementTableComponent implements OnInit {
  displayedColumns: string[] = ['idDepartement', 'nomDepart', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  id: number | undefined;
  //service activated route permet de donner des informations associé a la route qui est deja en cours
  constructor(private dialog: MatDialog, private api: departmentsService) {}

  ngOnInit(): void {
    this.getAllDepartements();
  }

  OpenDialogDepartement() {
    this.dialog
      .open(DepartementDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllDepartements();
        }
      });
  }
  /****************************************************assignDialog*********************************************************/

  openAssignDialog(idDepartement: any) {
    this.dialog
      .open(DepartementsAssignDialogComponent, {
        width: '30%',
        data: idDepartement,
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllDepartements();
        }
      });
  }
  /****************************************************getAllDepartements*********************************************************/
  getAllDepartements() {
    this.api.getDepartements().subscribe({
      next: (res) => {
        console.log(res);

        this.dataSource = new MatTableDataSource(res); //whatever response i get i will put it inside this data source
        this.dataSource.paginator = this.paginator; // i will initialize my paginator
        this.dataSource.sort = this.sort;
      },
      error(err) {
        alert('error while fetching data');
      },
    });
  }

  /****************************************************EditDepartements*********************************************************/
  editDepartement(row: any) {
    //when i click on the edit button the form open
    this.dialog
      .open(DepartementDialogComponent, {
        width: '30%',
        data: row, //i need to pass some data
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllDepartements();
        }
      });
  }

  deleteDepartement(idDepartement: number) {
    this.api.deleteDepartement(idDepartement).subscribe({
      next: (res) => {
        alert('departement deleted successfully');
        this.getAllDepartements();
      },
      error: (err) => {
        alert('error when deleting departement');
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

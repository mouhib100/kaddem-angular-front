import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { UniversiteService } from 'src/app/shared/universities.service';
import { UniversiteDialogComponent } from '../universite-dialog/universite-dialog.component';

@Component({
  selector: 'app-universite-table',
  templateUrl: './universite-table.component.html',
  styleUrls: ['./universite-table.component.css'],
})
export class UniversiteTableComponent implements OnInit {
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  displayedColumns: string[] = ['id', 'nomUniv', 'action', 'details'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: UniversiteService) {}

  ngOnInit(): void {
    this.getAllUniversities();
  }

  openDialog() {
    this.dialog
      .open(UniversiteDialogComponent, {
        width: '30%',
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'save') {
          this.getAllUniversities(); //the page load the data after the dialog component is closed
        }
      });
  }

  getAllUniversities() {
    this.api.getUniversites().subscribe({
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

  editUniversite(row: any) {
    //when i click on the edit button the form open
    this.dialog
      .open(UniversiteDialogComponent, {
        width: '30%',
        data: row, //i need to pass some data
      })
      .afterClosed()
      .subscribe((val) => {
        if (val === 'update') {
          this.getAllUniversities();
        }
      });
  }

  deleteUniversite(idUniv: number) {
    this.api.deleteUniversite(idUniv).subscribe({
      next: (res) => {
        alert('universite deleted successfully');
        this.getAllUniversities();
      },
      error: (err) => {
        alert('error when deleting universite');
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

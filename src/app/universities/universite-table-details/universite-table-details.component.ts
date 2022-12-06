import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversiteService } from 'src/app/shared/universities.service';

@Component({
  selector: 'app-universite-table-details',
  templateUrl: './universite-table-details.component.html',
  styleUrls: ['./universite-table-details.component.css'],
})
export class UniversiteTableDetailsComponent implements OnInit {
  displayedColumns: string[] = ['idDepart', 'nomDepart'];
  dataSource!: MatTableDataSource<any>;

  public idUniv!: number;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private api: UniversiteService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.retrieveDepartementsByUniversite();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  retrieveDepartementsByUniversite() {
    this.idUniv = this.route.snapshot.params['id'];
    console.log(this.idUniv);

    this.api.retrieveDepartementsByUniversite(this.idUniv).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error(err) {
        alert('error while fetching data');
      },
    });
  }
}

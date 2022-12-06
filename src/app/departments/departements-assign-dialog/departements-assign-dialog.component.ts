import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { UniversiteService } from 'src/app/shared/universities.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-departements-assign-dialog',
  templateUrl: './departements-assign-dialog.component.html',
  styleUrls: ['./departements-assign-dialog.component.css'],
})
export class DepartementsAssignDialogComponent implements OnInit {
  universities: any;
  SelectedUniversite: any;
  //create a form with type form
  assignForm!: FormGroup;
  departementForm: any;
  //we have to inject the api service
  constructor(
    private formBuilder: FormBuilder,
    private api: UniversiteService,
    private _formBuilder: FormBuilder,
    //let give it a name called editData
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DepartementsAssignDialogComponent>
  ) {}

  ngOnInit(): void {
    this.getAllUniversities();

    this.assignForm = this.formBuilder.group({
      nomUniv: ['', Validators.required], // universite name is required unless we don't this we can't submit our form
    });
  }

  getAllUniversities() {
    this.api.getUniversites().subscribe({
      next: (res) => {
        console.log(res);

        this.universities = res; //whatever response i get i will put it inside this data source
      },
      error(err) {
        alert('error while fetching data');
      },
    });
  }
  ////?

  assignUniversiteToDepartement() {
    this.api
      .assignUniversiteToDepartement(this.SelectedUniversite, this.editData)
      .subscribe({
        next: (res) => {
          alert('universite assigned succesfully');
          this.getAllUniversities();
        },
        error(err) {
          alert('error while assigning data');
        },
      });
  }
}

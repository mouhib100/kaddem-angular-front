import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UniversiteService } from 'src/app/shared/universities.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './universite-dialog.component.html',
  styleUrls: ['./universite-dialog.component.css'],
})
export class UniversiteDialogComponent implements OnInit {
  //create a form with type form
  universiteForm!: FormGroup;
  actionBtn: string = 'add';
  //we have to inject the api service
  constructor(
    private formBuilder: FormBuilder,
    private api: UniversiteService,
    //let give it a name called editData
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef< UniversiteDialogComponent>
  ) {}

  ngOnInit(): void {
    //we're going to initialize our form, and group our form
    this.universiteForm = this.formBuilder.group({
      nomUniv: ['', Validators.required], // universite name is required unless we don't this we can't submit our form
    });

    console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'update';
      this.universiteForm.controls['nomUniv'].setValue(this.editData.nomUniv);
    }
  }
  addUniversite() {
    //console.log(this.universiteForm.value);
    if (this.universiteForm.valid) {
      // post form value
      console.log(this.universiteForm.value);
      this.api.addUniversite(this.universiteForm.value).subscribe({
        next: (res) => {
          alert('universite added sucessfully');
          this.universiteForm.reset();
          this.dialogRef.close('save'); // i need it when i add a universite the dialog close after the action is done
        },
        error: () => {
          alert('error while adding this universite');
        },
      });
    }
  }

  updateUniversite() {
    const data = {
      nomUniv: this.universiteForm.value.nomUniv,
      idUniv: this.editData.idUniv,
    };
    if (this.universiteForm.valid) {
      console.log(data);
      this.api.putUniversite(data).subscribe({
        next: (res) => {
          alert('universite updated successfully');
          this.universiteForm.reset();
          this.dialogRef.close('update');
        },
        error: (err) => {
          alert('error while updating the universite');
        },
      });
    }
  }
}

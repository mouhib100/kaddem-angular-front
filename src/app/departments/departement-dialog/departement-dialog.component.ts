import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { departmentsService } from 'src/app/shared/departments.service';

@Component({
  selector: 'app-departement-dialog',
  templateUrl: './departement-dialog.component.html',
  styleUrls: ['./departement-dialog.component.css'],
})
export class DepartementDialogComponent implements OnInit {
  //create a form with type form
  departementForm!: FormGroup;
  actionBtn: string = 'add';
  //we have to inject the api service
  constructor(
    private formBuilder: FormBuilder,
    private api: departmentsService,
    //let give it a name called editData
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DepartementDialogComponent>
  ) {}

  ngOnInit(): void {
    //we're going to initialize our form, and group our form
    this.departementForm = this.formBuilder.group({
      nomDepartement: ['', Validators.required], // departement name is required unless we don't this we can't submit our form
    });
    /******************************************************************************************************************************/
    //if I recieved data i wanna batch all the values, when i click on a row i get the data will be show in my input
    if (this.editData) {
      console.log(this.editData.nomDepartement); //when I click on a row it gave me it's value
      this.actionBtn = 'update';
      //the name of the control name is nomDepart
      this.departementForm.controls['nomDepartement'].setValue(
        this.editData.nomDepartement
      );
    }
    /********************************************************************************************************************************* */
  }
  addDepartement() {
    if (this.departementForm.valid) {
      // post form value
      console.log(this.departementForm.value);
      this.api.addDepartement(this.departementForm.value).subscribe({
        next: (res) => {
          alert('departement added sucessfully');
          this.departementForm.reset();
          this.dialogRef.close('save'); //once the data is added we can close this form
        },
        error: () => {
          alert('error while adding this departement');
        },
      });
    }
  }

  updateDepartement() {
    const data = {
      nomDepartement: this.departementForm.value.nomDepartement,
      idDepartement: this.editData.idDepartement,
    };
    this.api.putDepartement(data).subscribe({
      next: (res) => {
        alert('departement updated successfully');
        this.departementForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert('error while updating the departement');
      },
    });
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-empolyee',
  templateUrl: './empolyee.component.html',
  styleUrls: ['./empolyee.component.css']
})
export class EmpolyeeComponent implements OnInit {

  public empForm!: FormGroup;
  public Qualification = ["B.Tech", "M.Tech", "Bsc", "Msc", "MBA"]
  public actionButton = 'Save';

  public EmpcodePattern = RegExp('^[a-zA-Z0-9]+$');
  public empNamePattern = RegExp('^[a-zA-Z]+$');
  age: any;
  showAge: any;
  minDate: Date;
  maxDate: Date;


  constructor(
    private _formbuild: FormBuilder,
    private _serv: EmployeeService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<EmpolyeeComponent>
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 20, 0, 1);
    this.maxDate = new Date();
    this.empForm = this._formbuild.group({
      Empcode: ['', [Validators.required, Validators.minLength(5), Validators.pattern(this.EmpcodePattern)]],
      EmpName: ['', [Validators.required, Validators.pattern(this.empNamePattern)]], 
      DateofBirth: ['',[Validators.required]],
      DateofJoining: ['',[Validators.required]],
      Qualification: [''],
      ManagerCode: ['']
    })
  }

  ngOnInit() {
    if (this.editData) {
      this.actionButton = 'Update'
      this.empForm.controls['Empcode'].setValue(this.editData.Empcode);
      this.empForm.controls['EmpName'].setValue(this.editData.EmpName);
      this.empForm.controls['DOB'].setValue(this.editData.DOB);
      this.empForm.controls['DOJ'].setValue(this.editData.DOJ);
      this.empForm.controls['Qualification'].setValue(this.editData.Qualification);
      this.empForm.controls['ManagerCode'].setValue(this.editData.ManagerCode);
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.empForm.controls;
  }

  addEmp() {
    if (!this.editData) {
      if (this.empForm.valid) {
        this._serv.postEmp(this.empForm.value).subscribe(
          {
            next: (res: any) => {
              this.empForm.reset();
              this.dialogRef.close('Save');
              alert('Post Successfully')
            }, error: (err: any) => {
              alert('error while post data');
            }
          }
        )
      }
    } else {
      this.updateEmp();
    }
  }

  updateEmp() {
    // this.getAge(this.empForm.controls['DOB'])
    // console.log(this.empForm.value, this.editData.id)   
    this._serv.updateEmp(this.empForm.value, this.editData.id).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.dialogRef.close('Update successfully');
        },
        error: () => {
          alert('error while update');
        }
      }
    )
  }

  getAge(date: any) {
    console.log(date.value)
    if (date) {
      let dateValue = date.format("yyyy-mm-dd")
      const convertAge = new Date(dateValue);
      const timeDiff = Math.abs(Date.now() - convertAge.getTime());
      this.showAge = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      console.log(this.showAge)
    }
  }

}



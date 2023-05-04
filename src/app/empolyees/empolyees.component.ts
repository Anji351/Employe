import { Component, OnInit } from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeldialogService } from '../deldialog.service';
import { EmployeeService } from '../employee.service';
import { EmpolyeeComponent } from '../empolyee/empolyee.component';

@Component({
  selector: 'app-empolyees',
  templateUrl: './empolyees.component.html',
  styleUrls: ['./empolyees.component.css']
})
export class EmpolyeesComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Empcode', 'EmpName', 'DOB', 'DOJ', 'Qualification', 'ManagerCode' , 'Actions'];
  

  constructor(private dialog: MatDialog, 
    private _empserve: EmployeeService,
    public dialogser:DeldialogService) { }

  ngOnInit() {
    this.getEmployee();
  }
  openDialog() {
    this.dialog.open(EmpolyeeComponent, {
      width: '54%',
    }).afterClosed().subscribe(val => {
      if (val === 'Save') {
        this.getEmployee();
      }
    })
  }

  getEmployee() {
    this._empserve.getAllEmp().subscribe(
      {
        next: (res) => {
          console.log(res);
          this.dataSource = new MatTableDataSource(res);
        },
        error(err) {
          alert("err while getting")
        }
      }
    )
  }

  //  editdata
  editEmp(row: any) {
    console.log(row)
    this.dialog.open(EmpolyeeComponent, {
      width: '54%',
      data: row
    }).afterClosed().subscribe(val => {
      console.log(val)
      // if (val === "Update") {
        this.getEmployee();
      // }
    })
  }


  delete(id: number) {

    this.dialogser.openConfirmdialog().afterClosed().subscribe(
      (res)=>{
        if(res){
          this._empserve.deleteEmp(id).subscribe(
            {
              next: (res: any) => {
                this.getEmployee();
              },
              error(err: any) {
                alert('error while deleted')
              }
            }
          )
        }
      }
    )
  }
}



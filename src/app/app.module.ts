import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpolyeeComponent } from './empolyee/empolyee.component';
import { EmpolyeesComponent } from './empolyees/empolyees.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeMaterialModule } from './employee-material/employee-material.module';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { DeldialogService } from './deldialog.service';


@NgModule({
  declarations: [
    AppComponent,
    EmpolyeeComponent,
    EmpolyeesComponent,
    DeleteDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    EmployeeMaterialModule
  ],
  providers: [EmployeeService,DeldialogService],
  bootstrap: [AppComponent],
  entryComponents:[DeleteDialogComponent]
})
export class AppModule { }

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.api;


  constructor(private _http: HttpClient) { }
  // getmethod
  getAllEmp(): Observable<Employee[]> {
    return this._http.get<Employee[]>(`${this.baseUrl}`);
  }
 
  // empid for update
  getEmp(id: number): Observable<Employee> {
    return this._http.get<Employee>(`${this.baseUrl + '/' + id}`)
  }

  // postmethod
  postEmp(employee: Employee): Observable<Employee[]> {
    return this._http.post<Employee[]>(`${this.baseUrl}`, employee);
  }
  // updateMethod
  updateEmp(data: Employee , id : number):Observable<Employee[]>{
    return this._http.put<Employee[]>(`${this.baseUrl+ '/' + id }`, data);
  }
 

  //deleteMethod
  deleteEmp(id: number): Observable<Employee[]> {
    return this._http.delete<Employee[]>(`${this.baseUrl + '/' + id}`);
  }
}

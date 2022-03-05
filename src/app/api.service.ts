import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeModal } from './employee-dashboard/employee-dashboard-modal';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  courseApi = environment?.serviceUrl;
  constructor(private http: HttpClient) { }
  getProduct() {
    return this.http.get(`${this.courseApi}/Product/getproducts`);
  }
  updateProductData(data: any) {
    return this.http.post(`${this.courseApi}/Product/updateproduct`, data)
      .pipe(map((data: any) => {
        return data;
      }))
  }
  addData(data: any) {
    return this.http.post(`${this.courseApi}/Product/addproduct`, data)
      .pipe(map((data: any) => {
        return data;
      }))
  }
  deleteProductData(productId: any) {
    return this.http.delete(`${this.courseApi}/Product/deleteproduct/${productId}`)
      .pipe(map((data: any) => {
        return data;
      }))
  }
  getTeacherData() {
    return this.http.get(`${this.courseApi}/Teacher/getteachers`)
  }
  updateTeacherData(data: any) {
    return this.http.post(`${this.courseApi}/Teacher/updateteacher`, data)
      .pipe(map((data: any) => {
        return data;
      }))
  }
  addTeacherData(data: any) {
    return this.http.post(`${this.courseApi}/Teacher/addteacher`, data)
      .pipe(map((data: any) => {
        return data;
      }))
  }
  deleteTeacherData(teacherId: any) {
    return this.http.delete(`${this.courseApi}/Teacher/deleteteacher/${teacherId}`)
      .pipe(map((data: any) => {
        return data;
      }))
  }
}

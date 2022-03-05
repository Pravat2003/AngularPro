import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { EmployeeModal } from './employee-dashboard-modal';
@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.scss']
})
export class EmployeeDashboardComponent implements OnInit {
  formValue !: FormGroup;
  employeeModalObj: EmployeeModal = new EmployeeModal();
  productDataList: any = [];
  editData: any;
  constructor(private fb: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.fb.group({
      productName: ['', Validators.required],
      productCode: ['', Validators.required],
      releaseDate: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      createdDate: [''],
      deletedDate: [''],

    })
    this.getProductData();
  }
  getProductData() {
    this.api.getProduct().subscribe(data => {
      console.log(data);
      this.productDataList = data;
    })
  }
  addProductData() {
    this.employeeModalObj.productName = this.formValue.value.productName;
    this.employeeModalObj.productCode = this.formValue.value.productCode;
    this.employeeModalObj.releaseDate = this.formValue.value.releaseDate ? new Date(this.formValue.value.releaseDate) : new Date();
    this.employeeModalObj.description = this.formValue.value.description;
    this.employeeModalObj.price = this.formValue.value.price ? Number(this.formValue.value.price) : 0;
    this.employeeModalObj.createdDate = this.formValue.value.createdDate ? new Date(this.formValue.value.createdDate) : new Date();
    this.employeeModalObj.deletedDate = this.formValue.value.deletedDate ? new Date(this.formValue.value.deletedDate) : new Date();
    this.api.addData(this.employeeModalObj).subscribe(data => {
      alert('Employe Added Successfully');
    })
  }
  updateProductData() {
    this.employeeModalObj.id = this.editData.id;
    this.employeeModalObj.productName = this.formValue.value.productName;
    this.employeeModalObj.productCode = this.formValue.value.productCode;
    this.employeeModalObj.releaseDate = this.formValue.value.createdDate ? new Date(this.formValue.value.releaseDate) : new Date();
    this.employeeModalObj.description = this.formValue.value.description;
    this.employeeModalObj.price = this.formValue.value.price ? Number(this.formValue.value.price) : 0;
    this.employeeModalObj.createdDate = this.formValue.value.createdDate ? new Date(this.formValue.value.createdDate) : new Date();
    this.employeeModalObj.deletedDate = this.formValue.value.deletedDate ? new Date(this.formValue.value.deletedDate) : new Date();
    this.api.updateProductData(this.employeeModalObj).subscribe(data => {
      console.log(data);
      alert('Product Updated Successfully!');
      let ref = document.getElementById('close');
      ref?.click();
      this.getProductData();
    })
  }
  openEditPopup(rowData: EmployeeModal) {
    this.editData = rowData;
    this.formValue.controls['productName'].setValue(rowData.productName);
    this.formValue.controls['productCode'].setValue(rowData.productCode);
    this.formValue.controls['createdDate'].setValue(rowData.createdDate);
    this.formValue.controls['description'].setValue(rowData.description);
    this.formValue.controls['price'].setValue(rowData.price);
    this.formValue.controls['releaseDate'].setValue(rowData.releaseDate);
    this.formValue.controls['deletedDate'].setValue(rowData.deletedDate);
  }
  deleteProductData(rowData: EmployeeModal) {
    this.api.deleteProductData(rowData.id).subscribe(data => {
      alert('Data Deleted Successfully');
      this.getProductData();
    })
  }
  onChangeCheckBox(event: any) {
    console.log(event);

  }
}

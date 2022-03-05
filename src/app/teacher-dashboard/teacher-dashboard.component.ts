import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  teacherListData: any = [];
  teacherForm!: FormGroup;
  constructor(private api: ApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      teacherId: ['', Validators.required],
      teacherName: ['', Validators.required],
      subject: ['', Validators.required],
      experience: ['', Validators.required]
    })
    this.getTeacherData();
  }
  getTeacherData() {
    this.api.getTeacherData().subscribe(data => {
      this.teacherListData = data;
    })
  }
  addTeacherData() {
    const sendingData = {
      teacherId: this.teacherForm.value.teacherId,
      name: this.teacherForm.value.teacherName,
      subject: this.teacherForm.value.subject,
      experience: this.teacherForm.value.experience
    }
    this.api.addTeacherData(sendingData).subscribe(data => {
      alert('Data Added Successfully!!')
    })
  }
}

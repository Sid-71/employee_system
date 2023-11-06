import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent implements OnInit {
  
empForm: FormGroup;
 education : string[] = [
  'Matric',
  'Diplolma',
  'Intermediate',
  'Graduate',
  'PostGraduate'
 ]

 constructor(private _fb : FormBuilder , 
  private _empService : EmployeeService , 
  private _dialogRef: DialogRef<EmpAddEditComponent>,
  @Inject(MAT_DIALOG_DATA) private data : any
  ) {
  
    this.empForm = this._fb.group({
    firstName :'',
    lastName :'',
    email :'',
    dob :'',
    education : '',
    gender :'',
    experience :'',
    package :'',
    company:''
  })

 }
 ngOnInit(): void {
   this.empForm.patchValue(this.data);
 }
 onFormSubmit(){
  if(this.empForm.valid)
  {
    this._empService.addEmployee(this.empForm.value).subscribe({
      next: (val : any)=>{
       alert("Employee added succesfuly");
       this._dialogRef.close()

      },
      error : (err : any)=>{
       console.error(err);
      }
    })
  }
 }
}

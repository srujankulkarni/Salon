import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import {FormBuilder, Validators, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-course-dialog-component',
  templateUrl: './course-dialog-component.html',
  styleUrls: ['./course-dialog-component.css']
})
export class CourseDialogComponent implements OnInit {
    data:any[];
  form: FormGroup;
  description:string;
phone:string;
barber:string;
inchair:boolean=false;
  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<CourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data) {

      this.description = data.description;
      
      this.form = fb.group({
        description: [this.description, Validators.required],
        phone: [this.phone, Validators.required],
       
        barber: [this.barber,Validators.required]
    });
  }

  ngOnInit() {
     
  }
 
  save() {
    
    this.data=  JSON.parse(sessionStorage.getItem("data"));
    let row= {  name: this.form.get('description').value, inchair: false, barber: this.form.get('barber').value, phone: this.form.get('phone').value }
    this.data.push(row);
    sessionStorage.setItem("data",JSON.stringify(this.data))
    window.location.reload();
  }

  close() {
      this.dialogRef.close();
  }

}

import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-change-barber-dialog',
  templateUrl: './change-barber-dialog.component.html',
  styleUrls: ['./change-barber-dialog.component.css']
})
export class ChangeBarberDialogComponent implements OnInit {

  data: any[];
  form: FormGroup;
  description: string;
  phone: string;
  barber: string;
  inchair: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ChangeBarberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    debugger;
    this.description = data;

    this.form = fb.group({
      barber: [this.barber, Validators.required],
    });
  }


  ngOnInit(): void {
  }

  save() {
    debugger;
    this.data = JSON.parse(sessionStorage.getItem("data"));
    let filterdata = this.data.filter(e=> e.number == this.description["number"]);
    filterdata[0]["barber"]=this.form.get("barber").value;
    let removedata=this.data.filter(e=> e.number !=this.description["number"] );
    let datanew=removedata;
    let removedatan=datanew.filter(e=>e.number!=filterdata[0]["number"])
    datanew=removedatan;
    datanew.push(filterdata[0]);
    datanew.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
    this.updateWaitingtime(datanew);
    sessionStorage.setItem("data",JSON.stringify(datanew))
    window.location.reload();
  }

  close() {
    this.dialogRef.close();
  }

  updateWaitingtime(customerList: any[]) {
    debugger;
    let timerForJoe = new Date().getTime();
    let timerForGary = new Date().getTime();
    const averageWaitingPeriod = 16.5;
    var currentDate = new Date();
    let joe, gary;
    var time = new Date(currentDate.getTime() + averageWaitingPeriod*60000).getTime() - currentDate.getTime();
    customerList.forEach((item) => {
      if (item.inchair) {
        item.waitTime = "00:00:00";
      } else if (item.barber === "Joe" && !item.inchair) {
        if (!joe) joe = averageWaitingPeriod;
        //new Date(currentDate.getTime() + averageWaitingPeriod*60000)
        else joe += averageWaitingPeriod; //new Date(currentDate.getTime() + averageWaitingPeriod*60000)
        item.waitTime = joe;
      } else if (item.barber === "Gary" && !item.inchair) {
        if (!gary) gary = averageWaitingPeriod;
        //new Date(currentDate.getTime() + averageWaitingPeriod*60000)
        else gary += averageWaitingPeriod; //new Date(currentDate.getTime() + averageWaitingPeriod*60000)
        item.waitTime = gary;
      }
    });
  }



}

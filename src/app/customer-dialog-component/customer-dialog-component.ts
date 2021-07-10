import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { FormBuilder, Validators, FormGroup } from "@angular/forms";
@Component({
  selector: "app-customer-dialog-component",
  templateUrl: "./customer-dialog-component.html",
  styleUrls: ["./customer-dialog-component.css"],
})
export class CustomerDialogComponent implements OnInit {
  data: any[];
  form: FormGroup;
  description: string;
  phone: string;
  barber: string;
  inchair: boolean = false;
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CustomerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.description = data.description;

    this.form = fb.group({
      description: [this.description, Validators.required],
      phone: [this.phone, Validators.required],

      barber: [this.barber, Validators.required],
    });
  }

  ngOnInit() {}

  save() {
    debugger;
    this.data = JSON.parse(sessionStorage.getItem("data"));
    const max = this.data.reduce((prev, current) =>
      prev.number > current.number ? prev : current
    );
    let row = {
      number: max.number + 1,
      name: this.form.get("description").value,
      inchair: false,
      barber: this.form.get("barber").value,
      phone: this.form.get("phone").value,
    };
    this.data.push(row);
    this.data.sort((a, b) =>
      a.number > b.number ? 1 : b.number > a.number ? -1 : 0
    );
    this.updateWaitingtime(this.data);
    sessionStorage.setItem("data", JSON.stringify(this.data));
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

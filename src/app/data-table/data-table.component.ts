import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataTableDataSource } from "./data-table-datasource";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CustomerDialogComponent} from "../customer-dialog-component/customer-dialog-component"
import { ChangeBarberDialogComponent } from "../change-barber-dialog/change-barber-dialog.component";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"],
})
export class DataTableComponent implements OnInit {

  dataSource:any[];
  today: number = Date.now();
  check:any[];
  data:any[];
  datanew:any[];
  datasss:any[];
  EXAMPLE_DATA= [
    {number:1, name: "Srujan", inchair: true, barber: "Joe", phone: 10,waitTime:"00:00:00" },
    {number:2,name: "Avinash", inchair: true, barber: "Gary", phone: 10,waitTime:"00:00:00" },
    { number:3, name: "Abhijeet", inchair: false, barber: "Gary", phone: 10,waitTime: "00:16.50"},

  ];
  constructor(private dialog: MatDialog) {setInterval(() => {this.today = Date.now()}, 1);
  this.check=JSON.parse(sessionStorage.getItem("data"));
  if(this.check!== null){

  }else{
    this.EXAMPLE_DATA.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
    sessionStorage.setItem("data",JSON.stringify(this.EXAMPLE_DATA))
  }

}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["number", "name", "phone","barber","waitTime","inchair"];

  ngOnInit() {

    this.dataSource =JSON.parse(sessionStorage.getItem("data"));
  }
  changeInChair(row){
    debugger
    console.log(row);
    this.data=  JSON.parse(sessionStorage.getItem("data"));
    let filterdata = this.data.filter(e=> e.barber ==row["barber"] && e.inchair==true);
    row["inchair"]=true;
    filterdata[0]["inchair"]=false;
    row["number"]=filterdata[0]["number"]
    let removedata=this.data.filter(e=> e.name !=row["name"] );
    this.datanew=removedata;
    let removedatan=this.datanew.filter(e=>e.name!=filterdata[0]["name"])
    this.datanew=removedatan;
    this.datanew.push(row);
    this.datanew.sort((a,b) => (a.number > b.number) ? 1 : ((b.number > a.number) ? -1 : 0))
    this.updateWaitingtime(this.datanew);
    sessionStorage.setItem("data",JSON.stringify(this.datanew))
    window.location.reload();

  }

  changeBarber(customer){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = customer;
    this.dialog.open(ChangeBarberDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(ChangeBarberDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
}

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };
    this.dialog.open(CustomerDialogComponent, dialogConfig);
    const dialogRef = this.dialog.open(CustomerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
}

updateWaitingtime(customerList: any[]){
  debugger;
  let timerForJoe = new Date().getTime();
  let timerForGary = new Date().getTime();
  const averageWaitingPeriod = 16.5
  var currentDate = new Date();
  let joe,gary;

  customerList.forEach(item=>{
    if(item.inchair){
      item.waitTime="00:00:00"
    }
    else if(item.barber==="Joe" && !item.inchair){
      if(!joe)
      joe = averageWaitingPeriod;//new Date(currentDate.getTime() + averageWaitingPeriod*60000)
      else
      joe+=averageWaitingPeriod;//new Date(currentDate.getTime() + averageWaitingPeriod*60000)
      item.waitTime = joe;
    }
    else if(item.barber==="Gary" && !item.inchair){
      if(!gary)
      gary = averageWaitingPeriod//new Date(currentDate.getTime() + averageWaitingPeriod*60000)
      else
      gary+=averageWaitingPeriod//new Date(currentDate.getTime() + averageWaitingPeriod*60000)
      item.waitTime = gary;
    }

  });
}

}

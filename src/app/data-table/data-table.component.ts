import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { DataTableDataSource } from "./data-table-datasource";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CourseDialogComponent} from "../course-dialog-component/course-dialog-component"

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
    { name: "Srujan", inchair: true, barber: "Joe", phone: 10 },
    { name: "Avinash", inchair: true, barber: "Gary", phone: 10 },
    {  name: "Abhijeet", inchair: false, barber: "Gary", phone: 10 },

  ];
  constructor(private dialog: MatDialog) {setInterval(() => {this.today = Date.now()}, 1);
  this.check=JSON.parse(sessionStorage.getItem("data"));
  if(this.check!== null){

  }else{
    sessionStorage.setItem("data",JSON.stringify(this.EXAMPLE_DATA))
  }

}
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [ "name", "phone","barber","inchair"];

  ngOnInit() {

    this.dataSource =JSON.parse(sessionStorage.getItem("data"));
  }
  changeinchair(row){
    debugger
    console.log(row);
    this.data=  JSON.parse(sessionStorage.getItem("data"));
    let filterdata = this.data.filter(e=> e.barber ==row["barber"] && e.inchair==true);
    row["inchair"]=true;
    filterdata[0]["inchair"]=false;
    //this.data.slice(this.data.findIndex(e=> e.barber ==row["barber"] && e.inchair==true))
    //this.data.slice(this.data.findIndex(e=> e.barber ==row["barber"] && e.name==row["name"]&& e.phone==row["phone"]))
    let removedata=this.data.filter(e=> e.name !=row["name"] );
    this.datanew=removedata;
    let removedatan=this.datanew.filter(e=>e.name!=filterdata[0]["name"])
    this.datanew=removedatan;
    this.datanew.push(filterdata[0]);
    this.datanew.push(row);
    sessionStorage.setItem("data",JSON.stringify(this.datanew))
    window.location.reload();

  }
  openDialog() {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        title: 'Angular For Beginners'
    };

    this.dialog.open(CourseDialogComponent, dialogConfig);

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
        data => console.log("Dialog output:", data)
    );
}

}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";

import { MatButtonModule } from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import { AppComponent } from "./app.component";
import { MainNavComponent } from "./main-nav/main-nav.component";
import { LayoutModule } from "@angular/cdk/layout";
import { DataTableComponent } from "./data-table/data-table.component";
import { CustomerDialogComponent } from './customer-dialog-component/customer-dialog-component';
import { ReactiveFormsModule } from '@angular/forms';
import {  MatSelectModule } from '@angular/material/select';
import {  MatInputModule  } from '@angular/material/input';
import "@angular/compiler";
import { ChangeBarberDialogComponent } from './change-barber-dialog/change-barber-dialog.component'
@NgModule({
  declarations: [AppComponent, MainNavComponent, DataTableComponent, CustomerDialogComponent, ChangeBarberDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,

  ],
  exports: [ MatFormFieldModule, MatInputModule ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CustomerDialogComponent]
})
export class AppModule {}

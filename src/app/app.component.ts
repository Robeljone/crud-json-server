import { AfterViewInit, Component, Inject, inject, Injectable, OnInit,ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormComponent } from './component/form/form.component';
import { ApiService } from './service/api.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { MatTable } from '@angular/material/table';
import { FormControl } from '@angular/forms';
export interface datas{
  id: number,
  Product_name: string,
  Catagory: string,
  Date: string,
  Freshnes: string,
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['id', 'Product_name', 'Catagory', 'Date','Freshnes','Action'];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog,private apiser: ApiService)
  {}
  ngAfterViewInit(): void {

  }
  ngOnInit(): void {
   this.getproduct();
   
  }
  openproduct(){
   this.dialog.open(FormComponent,{
    width: '30%',
    height: '60%'
   })
  }
  getproduct()
  {
    this.apiser.getproduct().subscribe({
      next:(res)=>{
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      },error:()=>{
        alert('No Data Found');
      }
    })
  }

  updatepro(row: any)
  {   
    this.dialog.open(FormComponent,{
      width: '30%',
      height: '60%',
      data: row
     })
     
  }

  deletepro(row: any)
  {
    
  }
  applyFilter(event: Event)
   {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { TicketCategoryModel, TicketCategorySearchModel } from 'src/app/models/ticket-category.model';
import { TicketCategoryService } from 'src/app/core/services/ticket-category.service';

@Component({
  selector: 'app-ticket-category-list',
  templateUrl: './ticket-category-list.component.html',
  styleUrls: ['./ticket-category-list.component.css']
})
export class TicketCategoryListComponent implements OnInit {

  searchModel: TicketCategorySearchModel = new TicketCategorySearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: TicketCategoryModel[] = [];
  displayedColumns: string[] = ['Name','Logo', 'Description', 'Actions'];
  dataSource: MatTableDataSource<TicketCategoryModel>;

  constructor(private ticketCategoryService: TicketCategoryService
     , private router: Router
     , private route: ActivatedRoute
     , private dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.list);
  }

  ngOnInit() {
    this.search();
  }

  applyFilter() {
    this.searchModel.start=0;
    this.search();
  }

  search() {
    this.ticketCategoryService.list(this.searchModel).subscribe(
      (response) => {
        this.list = <TicketCategoryModel[]>response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit(row: TicketCategoryModel){
    this.router.navigateByUrl('/ticketcategories/edit/'+ row.id);
  }


  delete(row: TicketCategoryModel){
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.ticketCategoryService.delete(<number>row.id).subscribe(
          (response) => {
            console.log(response);
            this.applyFilter();
          },
          (error) => {
            console.error(error);
          }
        );
      }
    });
    
  }

  ChangePage($event: BaseSearchModel) {
    this.searchModel.start = $event.start;
    this.searchModel.length = $event.length;
    this.search();
  }
  
  addNew(){
    this.router.navigateByUrl('/ticketcategories/create');
  }
}

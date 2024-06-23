import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { BoardingDetailModel, BoardingDetailSearchModel } from 'src/app/models/boarding-detail.model';
import { BoardingDetailService } from 'src/app/core/services/boarding-detail.service';

@Component({
  selector: 'app-boarding-Detail-list',
  templateUrl: './boarding-detail-list.component.html',
  styleUrls: ['./boarding-detail-list.component.css']
})
export class BoardingDetailListComponent implements OnInit {

  searchModel: BoardingDetailSearchModel = new BoardingDetailSearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: BoardingDetailModel[] = [];
  displayedColumns: string[] = ['BoardingDetailName', 'Email', 'PhoneNumber','Actions'];
  dataSource: MatTableDataSource<BoardingDetailModel>;

  constructor(private boardingDetailService: BoardingDetailService
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
    this.boardingDetailService.list(this.searchModel).subscribe(
      (response) => {
        this.list = <BoardingDetailModel[]>response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit(row: BoardingDetailModel){
    this.router.navigateByUrl('/boardingDetails/edit/'+ row.id);
  }


  delete(row: BoardingDetailModel){
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.boardingDetailService.delete(<number>row.id).subscribe(
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
    this.router.navigateByUrl('/boardingDetails/create');
  }
}

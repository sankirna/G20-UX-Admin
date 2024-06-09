import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { CityService } from 'src/app/core/services/city.service';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  searchModel: CitySearchModel = new CitySearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: CityModel[] = [];
  displayedColumns: string[] = ['Name','Actions'];
  dataSource: MatTableDataSource<CityModel>;

  constructor(private cityService: CityService
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
    this.cityService.list(this.searchModel).subscribe(
      (response) => {
        this.list = <CityModel[]>response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit(row: CityModel){
    this.router.navigateByUrl('/cities/edit/'+ row.id);
  }


  delete(row: CityModel){
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.cityService.delete(<number>row.id).subscribe(
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
    this.router.navigateByUrl('/cities/create');
  }
}

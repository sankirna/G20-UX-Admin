import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from 'src/app/core/services/country.service';
import { VenueService } from 'src/app/core/services/venue.service';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { VenueModel, VenueSearchModel } from 'src/app/models/venue.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-venue-list',
  templateUrl: './venue-list.component.html',
  styleUrls: ['./venue-list.component.css']
})
export class VenueListComponent implements OnInit {
  searchModel: VenueSearchModel = new VenueSearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: VenueModel[] = [];
  displayedColumns: string[] = ['Name', 'Location','Country','Capacity', 'Actions'];
  dataSource: MatTableDataSource<VenueModel>;


  constructor(private countryService: CountryService
    , private venueService: VenueService
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
    this.searchModel.start = 0;
    this.search();
  }

  search() {
    this.venueService.list(this.searchModel).subscribe(
      (response) => {
        this.list = <VenueModel[]>response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit(row: VenueModel) {
    this.router.navigateByUrl('/venues/edit/' + row.id);
  }


  delete(row: VenueModel) {
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.venueService.delete(<number>row.id).subscribe(
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

  addNew() {
    this.router.navigateByUrl('/venues/create');
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { ConfirmDialogComponent, ConfirmDialogModel } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { BaseSearchModel } from 'src/app/models/base-search.model';
import { EmailAccountModel, EmailAccountSearchModel } from 'src/app/models/email-account.model';
import { EmailAccountService } from 'src/app/core/services/email-account.service';

@Component({
  selector: 'app-email-account-list',
  templateUrl: './email-account-list.component.html',
  styleUrls: ['./email-account-list.component.css']
})
export class EmailAccountListComponent implements OnInit {

  searchModel: EmailAccountSearchModel = new EmailAccountSearchModel();
  paggerModel: PaggerModel = new PaggerModel();
  list: EmailAccountModel[] = [];
  displayedColumns: string[] = [ 'Email','Actions'];
  dataSource: MatTableDataSource<EmailAccountModel>;

  constructor(private emailAccountService: EmailAccountService
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
    this.emailAccountService.list(this.searchModel).subscribe(
      (response) => {
        this.list = <EmailAccountModel[]>response.data;
        this.dataSource = new MatTableDataSource(this.list);
        this.paggerModel = <PaggerModel>response.paggerModel;
        console.log(this.paggerModel);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  edit(row: EmailAccountModel){
    this.router.navigateByUrl('/email-accounts/edit/'+ row.id);
  }


  delete(row: EmailAccountModel){
    const message = `Are you sure you want to do delete?`;
    const dialogData = new ConfirmDialogModel("Confirm Action", message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.emailAccountService.delete(<number>row.id).subscribe(
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
    this.router.navigateByUrl('/email-accounts/create');
  }
}

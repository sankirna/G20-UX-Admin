import { Component, Inject, Input, OnInit, TemplateRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

export interface IDynamicDialogConfig {
  title?: string;
  acceptButtonTitle?: string;
  declineButtonTitle?: string;
  dialogContent: TemplateRef<any>;
}


@Component({
  selector: 'app-confirm-component-dialog',
  templateUrl: './confirm-component-dialog.component.html',
  styleUrls: ['./confirm-component-dialog.component.css']
})
export class ConfirmComponentDialogComponent implements OnInit{

  constructor(@Inject(MAT_DIALOG_DATA) public data: IDynamicDialogConfig) {
    data.acceptButtonTitle ?? 'Yes';
    data.title ?? 'Unnamed Dialog';
  }

  ngOnInit() {}
}

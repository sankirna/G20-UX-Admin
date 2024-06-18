import { Component, Input } from '@angular/core';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { environment } from 'src/environments/environment';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-file-preview',
  templateUrl: './file-preview.component.html',
  styleUrls: ['./file-preview.component.css']
})
export class FilePreviewComponent {
   @Input() fileUploadRequestModel: FileUploadRequestModel| undefined;
   @Input() showThumb : boolean=true;
   @Input() showPreview : boolean=false;
   defaulturl = environment.defaultUrl;

   /**
    *
    */
   constructor(public dialog: MatDialog) {
   }
   
   openDialog(templateRef:any) {
    let dialogRef = this.dialog.open(templateRef, {
     width: '800px',
     height: '600px'
   });
  }
}

import { Component, Input, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FileService } from "src/app/core/services/file.service";
import { FileUploadRequestModel } from "src/app/models/file.model";

@Component({
  selector: 'app-mat-file-Upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  @Input() mode: any
  @Input() names: any
  @Input() url: any
  @Input() method: any
  @Input() multiple: any
  @Input() disabled: any
  @Input() accept: any
  @Input() maxFileSize: any
  @Input() auto = true
  @Input() withCredentials: any
  @Input() invalidFileSizeMessageSummary: any
  @Input() invalidFileSizeMessageDetail: any
  @Input() invalidFileTypeMessageSummary: any
  @Input() invalidFileTypeMessageDetail: any
  @Input() previewWidth: any
  @Input() chooseLabel = 'Choose'
  @Input() uploadLabel = 'Upload'
  @Input() cancelLabel = 'Cance'
  @Input() customUpload: any
  @Input() showUploadButton: any
  @Input() showCancelButton: any


  @Input() dataUriPrefix: any
  @Input() deleteButtonLabel: any
  @Input() deleteButtonIcon = 'close'
  @Input() showUploadInfo: any

  /**
   *
   */


  @ViewChild('fileUpload') fileUpload: ElementRef | undefined

  inputFileName: string | undefined

  @Input() files: File[] = []

  @Input() fileModels: FileUploadRequestModel[] = [];
  
  @Output() uploadFileEvent: EventEmitter<FileUploadRequestModel> = new EventEmitter();


  constructor(private sanitizer: DomSanitizer
    , private fileService: FileService
  ) {

  }

  onClick(event: any) {
    if (this.fileUpload)
      this.fileUpload.nativeElement.click()
  }

  onInput(event: any) {

  }

  onFileSelected(event: any) {
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    console.log('event::::::', event)
    for (let i = 0; i < files.length; i++) {
      let file = files[i];

      //if(!this.isFileSelected(file)){
      if (this.validate(file)) {
        //      if(this.isImage(file)) {
        file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
        //      }
        if (!this.isMultiple()) {
          this.files = [];
          this.fileModels=[];
        }
        this.files.push(files[i]);
        let fileModel: FileUploadRequestModel = new FileUploadRequestModel();
        fileModel.fileName = file.name;
        // fileModel.fileSize = file.size.toString();
        // fileModel.fileType = file.type;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (reader && reader.result){
            fileModel.fileAsBase64 = reader.result.toString();
            debugger
            this.uploadFileEvent.emit(fileModel);
          // this.fileService.Upload(fileModel).subscribe(resp => {
          //   debugger
          //});
           }
        }
        //}
      }
    }
  }

  removeFile(event: any, file: any) {
    let ix
    if (this.files && -1 !== (ix = this.files.indexOf(file))) {
      this.files.splice(ix, 1)
      this.clearInputElement()
    }
  }

  validate(file: File) {
    for (const f of this.files) {
      if (f.name === file.name
        && f.lastModified === file.lastModified
        && f.size === f.size
        && f.type === f.type
      ) {
        return false
      }
    }
    return true
  }

  clearInputElement() {
    if (this.fileUpload)
      this.fileUpload.nativeElement.value = ''
  }


  isMultiple(): boolean {
    return this.multiple
  }
}

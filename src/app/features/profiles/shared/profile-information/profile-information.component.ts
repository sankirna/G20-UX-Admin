import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumModel, PrimaryDataModel } from '../../../../models/common.model';
import { CommonService } from 'src/app/core/services/common.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  genderTypes: EnumModel[] | undefined = [];

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.getPrimaryData();
  }

  getPrimaryData() {
    this.genderTypes = this.commonService.getPrimaryData()?.genderTypes;
  }
  
  ngAfterViewInit(): void {


  }

  get resumeFileDataForm() {
    return this.form.get("resumeFileData") as FormGroup;
  }

  uploadFile(event: FileUploadRequestModel){
    debugger
    this.resumeFileDataForm.controls["fileName"].setValue(event.fileName);
    this.resumeFileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
  }
}

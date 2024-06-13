import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumModel, PrimaryDataModel } from '../../../../models/common.model';
import { CommonService } from 'src/app/core/services/common.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  productTypes: EnumModel[] | undefined = [];

  constructor(
    private commonService: CommonService
  ) {
  }

  ngOnInit() {
    this.getPrimaryData();
  }

  getPrimaryData() {
    this.productTypes = this.commonService.getPrimaryData()?.productTypes;
  }
  
  ngAfterViewInit(): void {


  }

  get resumeFileDataForm() {
    return this.form.get("resumeFileData") as FormGroup;
  }

  uploadFile(event: FileUploadRequestModel){
    
    this.resumeFileDataForm.controls["fileName"].setValue(event.fileName);
    this.resumeFileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
  }
}

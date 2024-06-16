import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from 'src/app/core/services/file.service';
import { TicketCategoryService } from 'src/app/core/services/ticket-category.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { TicketCategoryModel } from 'src/app/models/ticket-category.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ticket-category-create',
  templateUrl: './ticket-category-create.component.html',
  styleUrls: ['./ticket-category-create.component.css']
})
export class TicketCategoryCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: TicketCategoryModel | undefined;
  files: File[] = []
  id: number = 0;
  submitted=false;
  fileName :any='';
  defaulturl = environment.defaultUrl;


  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private ticketCategoryService: TicketCategoryService    
    , public fileService: FileService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  get fileDataForm() {
    return this.form.get("file") as FormGroup;
  }


  
  buildForm() {
    if (!this.model) {
      this.model= new TicketCategoryModel();
      this.model.id=0;
    }
      
    if(!this.model.file){
      this.model.file=new FileUploadRequestModel();
      this.model.file.fileType=1;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      description: [this.model.description],
    });
    
    this.form.addControl("file", this.fileService.getForm(this.model.file));
    if(this.model.file && this.model.file.fileName){
      this.files.push( new File([],this.model.file.fileName, {}))
    }
  }

  isValid(): boolean {
    return this.form.valid;
  }

  uploadFile(event: FileUploadRequestModel){
    this.fileDataForm.controls["fileName"].setValue(event.fileName);
    this.fileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
    this.fileDataForm.controls["id"].setValue(0);
  }

  removeFile(event: FileUploadRequestModel){
    this.fileDataForm.controls["fileName"].setValue("");
    this.fileDataForm.controls["fileAsBase64"].setValue("");
    this.fileDataForm.controls["id"].setValue(0);
  }

  getData() {
    this.ticketCategoryService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.fileName= this.model.file;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    this.submitted=true;
    if (this.isValid()) {
      this.model = <TicketCategoryModel>this.form.getRawValue();
      if(!this.isEdit){
        this.ticketCategoryService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/ticketcategories/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.ticketCategoryService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/ticketcategories/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }
      
    }
  }

  onClear() {

  }
  gotoList(){
    this.router.navigateByUrl('/ticketcategories/list');
  }
}

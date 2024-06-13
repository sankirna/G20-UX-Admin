import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EnumModel, PrimaryDataModel } from '../../../../models/common.model';
import { CommonService } from 'src/app/core/services/common.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { VenueModel, VenueSearchModel } from 'src/app/models/venue.model';
import { VenueService } from 'src/app/core/services/venue.service';
import { TeamModel, TeamSearchModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/core/services/team.service';
import * as _ from 'lodash';
import { ProductTicketCategoryMapModel } from 'src/app/models/product-ticket-category-map.model';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() isEdit:boolean=false;
  productTypes: EnumModel[] | undefined = [];
  venues: VenueModel[] = [];
  teams: TeamModel[] = [];
  files: File[] = []

  constructor(
    private commonService: CommonService
    , private venueService: VenueService
    , private productService: ProductService
    , private teamService: TeamService
  ) {
  }

  ngOnInit() {
    this.getPrimaryData();
    this.loadFiles() ;
    this.loadVenues();
    this.loadTeams();
  }

  getPrimaryData() {
    this.productTypes = this.commonService.getPrimaryData()?.productTypes;
  }

  ngAfterViewInit(): void {

  }

  get fileDataForm() {
    return this.form.get("file") as FormGroup;
  }

  loadFiles() {
    if (this.fileDataForm) {
      this.files = [];
      let fileModel = this.fileDataForm.getRawValue();
      if(fileModel.fileName){
      this.files.push(new File([], fileModel.fileName, {}))
      }
    }
  }


  loadVenues() {
    let venueSearchModel = new VenueSearchModel();
    venueSearchModel.length = 10000;
    venueSearchModel.start = 0;
    this.venueService.list(venueSearchModel).subscribe(data => {
      if (data.data) {
        this.venues = data.data;
      }
    });
  }

  loadTeams() {
    let teamSearchModel = new TeamSearchModel();
    teamSearchModel.length = 10000;
    teamSearchModel.start = 0;
    this.teamService.list(teamSearchModel).subscribe(data => {
      if (data.data) {
        this.teams = data.data;
      }
    });
  }

  onVenueChange(venueId: number): void {
    if(!this.isEdit && venueId>0)
    {
      this.venueService.get(venueId).subscribe(
        (response) => {
          // this.model = response;
          // this.buildForm();
          //this.buildProductTicketCategoryMapModelForm(response);
          var productTicketCategoryMapModels=this.productService.getProductTicketCategoryFromVenueTicketCategory(response.venueTicketCategories);
          this.buildProductTicketCategoryMapModelForm(productTicketCategoryMapModels);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    // this.form.get('stateId')?.reset();
    // this.form.get('cityId')?.reset();
    // if (countryId) {
    //   this.loadStates(countryId);
    // } else {
    //   this.states = [];
    // }
  }

  buildProductTicketCategoryMapModelForm(productTicketCategoryMapModels: ProductTicketCategoryMapModel[]) {
    var self = this;
    var productTicketCategroiesFormArray=self.form.controls["productTicketCategories"] as FormArray;
     productTicketCategroiesFormArray.setValue([]);
    _.forEach(productTicketCategoryMapModels, function (value, key) {
      let productTicketCategoryMapForm: FormGroup = self.productService.getProductTicketCategoryMapModelForm(value);
      productTicketCategroiesFormArray.push(productTicketCategoryMapForm);
    });
  }

  uploadFile(event: FileUploadRequestModel) {
    this.fileDataForm.controls["fileName"].setValue(event.fileName);
    this.fileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
    this.fileDataForm.controls["id"].setValue(0);
  }

  removeFile(event: FileUploadRequestModel) {
    this.fileDataForm.controls["fileName"].setValue("");
    this.fileDataForm.controls["fileAsBase64"].setValue("");
    this.fileDataForm.controls["id"].setValue(0);
  }
}

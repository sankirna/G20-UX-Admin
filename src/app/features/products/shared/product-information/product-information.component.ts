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
import { ProductModel, ProductSearchModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { CategoryModel, CategorySearchModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() isEdit: boolean = false;
  productTypes: EnumModel[] | undefined = [];
  venues: VenueModel[] = [];
  teams: TeamModel[] = [];
  categories: CategoryModel[] = [];
  files: File[] = []
  products: ProductModel[] = [];
  productIds: number[] = [];
  constructor(
    private commonService: CommonService
    , private venueService: VenueService
    , private productService: ProductService
    , private teamService: TeamService
    , private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.getPrimaryData();
    this.loadFiles();
    this.loadVenues();
    this.loadTeams();
    this.loadCategories();
  }

  getPrimaryData() {
    this.productTypes = this.commonService.getPrimaryData()?.productTypes;
  }

  ngAfterViewInit(): void {

  }

  get isReguler(): boolean {
    return this.productService.isReguler(this.form);
  }

  get fileDataForm() {
    return this.form.get("file") as FormGroup;
  }

  loadFiles() {
    if (this.fileDataForm) {
      this.files = [];
      let fileModel = this.fileDataForm.getRawValue();
      if (fileModel.fileName) {
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
  loadCategories() {
    let categoryModel = new CategorySearchModel();
    categoryModel.length = 10000;
    categoryModel.start = 0;
    this.categoryService.list(categoryModel).subscribe(data => {
      if (data.data) {
        this.categories = data.data;
      }
    });
  }

  onProductTypeChange(productTypeEnum: EnumModel) {
    if (productTypeEnum.value == 1
      && this.productService.regularProducts
      && this.productService.regularProducts.length<=0
     ) {
      this.productService.getRegularProducts().subscribe(data => {
        if (data.data) {
          this.productService.regularProducts=data.data;
        }
      });
    }
  }

  onVenueChange(venueId: number): void {
    if (!this.isEdit && venueId > 0) {
      this.venueService.get(venueId).subscribe(
        (response) => {
          // this.model = response;
          // this.buildForm();
          //this.buildProductTicketCategoryMapModelForm(response);
          var productTicketCategoryMapModels = this.productService.getProductTicketCategoryFromVenueTicketCategory(response.venueTicketCategories);
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
    var productTicketCategroiesFormArray = self.form.controls["productTicketCategories"] as FormArray;
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
    this.fileDataForm.controls["url"].setValue("");
  }

  // loadCategoriesByProduct() {
   
  //   this.productService.getByProducts(this.productIds.toString()).subscribe(
  //     (response) => {
  //       // this.model = response;
  //       // this.buildForm();
  //       //this.buildProductTicketCategoryMapModelForm(response);
  //       var productTicketCategoryMapModels = this.productService.getProductTicketCategoryFromVenueTicketCategory(response.productTicketCategories);
  //       this.buildProductTicketComboMapModelForm(productTicketCategoryMapModels);
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

  // buildProductTicketComboMapModelForm(productTicketCategoryMapModels: ProductTicketCategoryMapModel[]) {
  //   var self = this;
  //   var productTicketCategroiesFormArray = self.form.controls["productTicketCategories"] as FormArray;
  //   productTicketCategroiesFormArray.setValue([]);
  //   _.forEach(productTicketCategoryMapModels, function (value, key) {
  //     let productTicketCategoryMapForm: FormGroup = self.productService.getProductTicketCategoryMapModelForm(value);
  //     productTicketCategroiesFormArray.push(productTicketCategoryMapForm);
  //   });
  // }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from 'src/app/core/services/city.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { FileService } from 'src/app/core/services/file.service';
import { StateService } from 'src/app/core/services/state.service';
import { TeamService } from 'src/app/core/services/team.service';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';
import { EnumModel } from 'src/app/models/common.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';
import { TeamModel } from 'src/app/models/team.model';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.css']
})
export class TeamCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: TeamModel | undefined;
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];
  logFiles: File[] = []
  id: number = 0;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private teamService: TeamService
    , private commonService: CommonService
    , private countryService: CountryService
    , private stateService: StateService
    , private cityService: CityService
    , public fileService: FileService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.loadContries();
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  get logoFileDataForm() {
    return this.form.get("logo") as FormGroup;
  }


  loadContries() {
    let countrySearchModel = new CountrySearchModel();
    countrySearchModel.length = 10000;
    countrySearchModel.start = 0;
    this.countryService.list(countrySearchModel).subscribe(data => {
      if (data.data) {
        this.countries = data.data;
      }
    });
  }

  loadStates(countryId: number) {
    let stateSearchModel = new StateSearchModel();
    stateSearchModel.length = 10000;
    stateSearchModel.start = 0;
    stateSearchModel.countryId = countryId;
    this.stateService.list(stateSearchModel).subscribe(data => {
      if (data.data) {
        this.states = data.data;
      }
    });
  }

  loadCities(stateId: number) {
    let citySearchModel = new CitySearchModel();
    citySearchModel.length = 10000;
    citySearchModel.start = 0;
    citySearchModel.stateId = stateId;
    this.cityService.list(citySearchModel).subscribe(data => {
      if (data.data) {
        this.cities = data.data;
      }
    });
  }
  
  onCountryChange(countryId: number): void {
    this.form.get('stateId')?.reset();
    this.form.get('cityId')?.reset();
    if (countryId) {
      this.loadStates(countryId);
    } else {
      this.states = [];
    }
  }

  onStateChange(stateId: number): void {
    this.form.get('cityId')?.reset();
    if (stateId) {
      this.loadCities(stateId);
    } else {
      this.cities = [];
    }
  }

  

  
  buildForm() {
    if (!this.model) {
      this.model= new TeamModel();
      this.model.id=0;
    }
      
    if(!this.model.logo){
      this.model.logo=new FileUploadRequestModel();
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name, Validators.required],
      shortName: [this.model.shortName],
      countryId: [this.model.countryId, Validators.required],
      stateId: [this.model.stateId],
      cityId: [this.model.cityId],
      color: [this.model.color],
    });
    
    this.form.addControl("logo", this.fileService.getForm(this.model.logo));
    if(this.model.logo && this.model.logo.fileName){
      this.logFiles.push( new File([],this.model.logo.fileName, {}))
    }
   
    if(this.model.countryId && this.model.countryId>0){
      this.loadStates(this.model.countryId);
    }

    if(this.model.stateId && this.model.stateId>0){
      this.loadCities(this.model.stateId);
    }
  }

  isValid(): boolean {
    return this.form.valid;
  }

  uploadFile(event: FileUploadRequestModel){
    this.logoFileDataForm.controls["fileName"].setValue(event.fileName);
    this.logoFileDataForm.controls["fileAsBase64"].setValue(event.fileAsBase64);
    this.logoFileDataForm.controls["id"].setValue(0);
  }

  removeFile(event: FileUploadRequestModel){
    this.logoFileDataForm.controls["fileName"].setValue("");
    this.logoFileDataForm.controls["fileAsBase64"].setValue("");
    this.logoFileDataForm.controls["id"].setValue(0);
  }

  getData() {
    this.teamService.get(this.id).subscribe(
      (response) => {
        this.model = response;
        this.buildForm();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit() {
    debugger
    if (this.isValid()) {
      this.model = <TeamModel>this.form.getRawValue();
      if(!this.isEdit){
        this.teamService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/teams/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.teamService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/teams/list');
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
    this.router.navigateByUrl('/teams/list');
  }
}

import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumModel, PrimaryDataModel } from '../../../../models/common.model';
import { CommonService } from 'src/app/core/services/common.service';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { VenueModel, VenueSearchModel } from 'src/app/models/venue.model';
import { VenueService } from 'src/app/core/services/venue.service';
import { TeamModel, TeamSearchModel } from 'src/app/models/team.model';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css']
})
export class ProductInformationComponent implements OnInit, AfterViewInit {
  @Input() form: FormGroup = new FormGroup({});
  productTypes: EnumModel[] | undefined = [];
  venues: VenueModel[] = [];
  teams: TeamModel[] = [];
  files: File[] = []

  constructor(
    private commonService: CommonService
    , private venueService: VenueService
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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CityService } from 'src/app/core/services/city.service';
import { CommonService } from 'src/app/core/services/common.service';
import { CountryService } from 'src/app/core/services/country.service';
import { StateService } from 'src/app/core/services/state.service';
import { CityModel, CitySearchModel } from 'src/app/models/city.model';
import { EnumModel } from 'src/app/models/common.model';
import { CountryModel, CountrySearchModel } from 'src/app/models/country.model';
import { StateModel, StateSearchModel } from 'src/app/models/state.model';

@Component({
  selector: 'app-profile-education-form',
  templateUrl: './profile-education-form.component.html',
  styleUrls: ['./profile-education-form.component.css']
})
export class ProfileEducationFormComponent implements OnInit {
  @Input() form: FormGroup = new FormGroup({});
  @Input() isEdit: boolean = false;
  @Output() cancelEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() submitEvent: EventEmitter<FormGroup> = new EventEmitter();
  countries: CountryModel[] = [];
  states: StateModel[] = [];
  cities: CityModel[] = [];

  constructor(
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private commonService: CommonService
  ) {

  }

  ngOnInit(): void {
  }

  onCancel() {
    this.cancelEvent.emit(true);
  }

  isValid(): boolean {
    return true || this.form.valid;
  }

  onSubmit() {
    if (this.isValid()) {
      this.submitEvent.emit(this.form);
    }
  }
}

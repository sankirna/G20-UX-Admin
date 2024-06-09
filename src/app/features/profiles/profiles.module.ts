import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { ProfileInformationComponent } from './shared/profile-information/profile-information.component';
import { ProfileAddressListComponent } from './shared/profile-address/profile-address-list/profile-address-list.component';
import { ProfileAddressFormComponent } from './shared/profile-address/profile-address-form/profile-address-form.component';
import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfileService } from 'src/app/core/services/profile.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CityService } from 'src/app/core/services/city.service';
import { StateService } from 'src/app/core/services/state.service';
import { CountryService } from 'src/app/core/services/country.service';
import { ProfileFamilyListComponent } from './shared/profile-family/profile-family-list/profile-family-list.component';
import { ProfileFamilyFormComponent } from './shared/profile-family/profile-family-form/profile-family-form.component';
import { ProfileAchivementListComponent } from './shared/profile-achivement/profile-achivement-list/profile-achivement-list.component';
import { ProfileAchivementFormComponent } from './shared/profile-achivement/profile-achivement-form/profile-achivement-form.component';
import { ProfileEducationListComponent } from './shared/profile-education/profile-education-list/profile-education-list.component';
import { ProfileEducationFormComponent } from './shared/profile-education/profile-education-form/profile-education-form.component';
import { ProfileOccupationListComponent } from './shared/profile-occupation/profile-occupation-list/profile-occupation-list.component';
import { ProfileOccupationFormComponent } from './shared/profile-occupation/profile-occupation-form/profile-occupation-form.component';

@NgModule({
  declarations: [ 
      ProfileListComponent
    , ProfileCreateComponent
    , ProfileEditComponent
    , ProfileInformationComponent
    , ProfileAddressListComponent
    , ProfileAddressFormComponent
    , ProfileFamilyListComponent
    , ProfileFamilyFormComponent
    , ProfileEducationListComponent
    , ProfileEducationFormComponent
    , ProfileOccupationListComponent
    , ProfileOccupationFormComponent
    , ProfileAchivementListComponent
    , ProfileAchivementFormComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    SharedModule,
    ProfilesRoutingModule,
  ],
  providers: [
    ProfileService,
    CountryService,
    StateService,
    CityService
  ]
})
export class ProfilesModule { }

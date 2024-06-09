import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { ProfileService } from 'src/app/core/services/profile.service';
import { CommonService } from 'src/app/core/services/common.service';
import { OccupationModel } from 'src/app/models/profile.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponentDialogComponent, IDynamicDialogConfig } from 'src/app/shared/confirm-component-dialog/confirm-component-dialog.component';

@Component({
  selector: 'app-profile-occupation-list',
  templateUrl: './profile-occupation-list.component.html',
  styleUrls: ['./profile-occupation-list.component.css']
})
export class ProfileOccupationListComponent {
  @Input() forms: FormArray = this.fb.array([]);
  requestForm: FormGroup = new FormGroup({});
  isShowForm: boolean = false;
  isEdit: boolean = false;
  dialogRef: MatDialogRef<any, any> | undefined ;

  @ViewChild('dataDialogTemplate') dataTemplate: TemplateRef<any> | undefined;

  constructor(
    private router: Router
    , private route: ActivatedRoute
    , private profileService: ProfileService
    , private commonService: CommonService
    , private fb: FormBuilder
    , public dialog: MatDialog) {
  }

  openOccupationFormDialog() {
    this.dialogRef = this.dialog.open(ConfirmComponentDialogComponent, {
      data: <IDynamicDialogConfig>{
        title: '',
        dialogContent: this.dataTemplate,
        acceptButtonTitle: '',
        declineButtonTitle: ''
      }
    });
  }

  closeOccupationFormDialog(){
    this.dialogRef?.close();
  }

  edit(index: number, form: AbstractControl) {
    this.requestForm = _.cloneDeep(form) as FormGroup;
    this.isShowForm = true;
    this.isEdit = true;
    this.openOccupationFormDialog();
  }

  delete(index: number, form: AbstractControl) {
    this.forms.removeAt(index);
  }

  add() {
    // if (!this.isShowForm && !this.isEdit) {
    let model = new OccupationModel();
    this.requestForm = this.profileService.getProfileOccupationForm(model);
    this.isShowForm = true;
    this.isEdit = false;
    this.openOccupationFormDialog();
    // }
  }

  resetForm() {
    this.isShowForm = false;
    this.isEdit = false;
    this.requestForm = new FormGroup({});
    this.closeOccupationFormDialog();
  }

  cancelEvent($event: boolean) {
    this.resetForm();
  }

  submitEvent(form: FormGroup) {
    let randomId = form.get("randomId")?.value;
    let indexFound: number = -1;
    this.forms.controls.forEach((element, index) => {
      if (element.get("randomId")?.value == randomId) {
        indexFound = index;
      }
    });
    if (indexFound != -1) {
      this.forms.removeAt(indexFound);
      this.forms.insert(indexFound, form);
    }
    else {
      this.forms.push(form);
    }
    this.resetForm();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { EmailAccountService } from 'src/app/core/services/email-account.service';
import { MessageTemplateService } from 'src/app/core/services/message-template.service';
import { RoleService } from 'src/app/core/services/role.service';
import { EnumModel } from 'src/app/models/common.model';
import { EmailAccountModel, EmailAccountSearchModel } from 'src/app/models/email-account.model';
import { MessageTemplateModel } from 'src/app/models/message-template.model';
import { RoleModel, RoleSearchModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-message-template-create',
  templateUrl: './message-template-create.component.html',
  styleUrls: ['./message-template-create.component.css']
})
export class MessageTemplateCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: MessageTemplateModel | undefined;
  emailAccounts: EmailAccountModel[] = [];  
  id: number = 0;
  submitted = false;



  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private messageTemplateService: MessageTemplateService
    , private emailAccountService: EmailAccountService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  
  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.loadEamilAccounts() ;
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }


  loadEamilAccounts() {
    let emailAccountSearchModel = new EmailAccountSearchModel();
    emailAccountSearchModel.length = 10000;
    emailAccountSearchModel.start = 0;
    this.emailAccountService.list(emailAccountSearchModel).subscribe(data => {
      if (data.data) {
        this.emailAccounts = data.data;
      }
    });
  }
  
  buildForm() {
    if (!this.model) {
      this.model= new MessageTemplateModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      name: [this.model.name],
      bccEmailAddresses: [this.model.bccEmailAddresses],
      emailAccountId: [this.model.emailAccountId],
      subject: [this.model.subject],
      body: [this.model.body],
      isActive: [this.model.isActive],
      delayBeforeSend: [this.model.delayBeforeSend],
      delayPeriodId: [this.model.delayPeriodId],
      attachedDownloadId: [this.model.attachedDownloadId],
      allowDirectReply: [this.model.allowDirectReply],
      limitedToStores: [this.model.limitedToStores],
      delayPeriod: [this.model.delayPeriod],
    });
  }


  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.messageTemplateService.get(this.id).subscribe(
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
    this.submitted =true;
    if (this.isValid()) {      
      this.model = <MessageTemplateModel>this.form.getRawValue();
      if(!this.isEdit){
        this.messageTemplateService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/message-templates/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.messageTemplateService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/message-templates/list');
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
    this.router.navigateByUrl('/message-templates/list');
  }
}

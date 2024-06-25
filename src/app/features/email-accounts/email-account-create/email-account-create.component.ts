import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';
import { EmailAccountService } from 'src/app/core/services/email-account.service';
import { RoleService } from 'src/app/core/services/role.service';
import { EnumModel } from 'src/app/models/common.model';
import { EmailAccountModel } from 'src/app/models/email-account.model';
import { RoleModel, RoleSearchModel } from 'src/app/models/role.model';

@Component({
  selector: 'app-email-account-create',
  templateUrl: './email-account-create.component.html',
  styleUrls: ['./email-account-create.component.css']
})
export class EmailAccountCreateComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  model: EmailAccountModel | undefined;
  roles: RoleModel[] = [];  
  id: number = 0;
  submitted = false;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private emailAccountService: EmailAccountService
    , private roleService: RoleService
    , private commonService: CommonService
    , private fb: FormBuilder) {
    this.buildForm();
  }

  
  get isEdit(): boolean {
    return (this.id && this.id > 0 ? true : false);
  }

  ngOnInit() {
    this.loadRoles() ;
    this.id = <number><unknown>this.route.snapshot.paramMap.get('id');
    if (this.isEdit) {
      this.getData();
    }else{
      this.buildForm();
    }
  }

  loadRoles() {
    let roleSearchModel = new RoleSearchModel();
    roleSearchModel.length = 10000;
    roleSearchModel.start = 0;
    this.roleService.list(roleSearchModel).subscribe(data => {
      if (data.data) {
        this.roles = data.data;
      }
    });
  }
  
  buildForm() {
    if (!this.model) {
      this.model= new EmailAccountModel();
      this.model.id=0;
    }
    this.form = this.fb.group({
      id: [this.model.id],
      email: [this.model.email],
      displayName: [this.model.displayName],
      host: [this.model.host],
      port: [this.model.port],
      username: [this.model.username],
      password: [this.model.password],
      enableSsl: [this.model.enableSsl],
      maxNumberOfEmails: [this.model.maxNumberOfEmails],
      emailAuthenticationMethodId: [this.model.emailAuthenticationMethodId],
      clientId: [this.model.clientId],
      clientSecret: [this.model.clientSecret],
      tenantId: [this.model.tenantId],
      
    });
  }


  isValid(): boolean {
    return this.form.valid;
  }

  getData() {
    this.emailAccountService.get(this.id).subscribe(
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
      this.model = <EmailAccountModel>this.form.getRawValue();
      if(!this.isEdit){
        this.emailAccountService.create(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/email-accounts/list');
          },
          (error) => {
            console.error(error);
          }
        );
      }else{
        this.emailAccountService.update(this.model).subscribe(
          (response) => {
            this.router.navigateByUrl('/email-accounts/list');
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
    this.router.navigateByUrl('/email-accounts/list');
  }
}

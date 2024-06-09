import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileListComponent } from './profile-list/profile-list.component';
import { ProfileCreateComponent } from './profile-create/profile-create.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' },
      { path: 'list', component: ProfileListComponent },
      { path: 'create', component: ProfileCreateComponent },
      { path: 'edit/:id', component: ProfileEditComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }

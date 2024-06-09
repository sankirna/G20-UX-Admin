import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/shared/layout/layout.component';
import { StateListComponent } from './state-list/state-list.component';
import { StateCreateComponent } from './state-create/state-create.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'list', component: StateListComponent },
      { path: 'create', component: StateCreateComponent },
      { path: 'edit/:id', component: StateCreateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatesRoutingModule { }

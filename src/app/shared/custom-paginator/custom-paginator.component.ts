import { Component, EventEmitter, Input, Output  } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaggerModel } from 'src/app/models/base-paged-list.model';
import { BaseSearchModel } from 'src/app/models/base-search.model';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageIndex = 0;
  @Input() pageSizeOptions = [5, 10, 25];
  @Input() paggerModel: PaggerModel = new PaggerModel();
  @Output() changePage: EventEmitter<BaseSearchModel> = new EventEmitter();

  onChangePage(pe: PageEvent) {
    let baseSearchModel = new BaseSearchModel();
    baseSearchModel.start = pe.pageIndex * pe.pageSize;
    baseSearchModel.length = pe.pageSize;
    this.changePage.emit(baseSearchModel);
  }
}

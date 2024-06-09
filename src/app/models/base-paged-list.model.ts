export class BasePagedListModel<T> {
      Data: T[]| undefined;
      draw: string| undefined="";
      recordsFiltered: number| undefined;
      recordsTotal: number| undefined;
}

export class PaggerModel{
  length: number|undefined;
  pageSize:number|undefined;
  pageIndex: number|undefined;
}


export class PagedListModel<T>{
    data: T[]| undefined;
    paggerModel: PaggerModel|undefined;
}
    
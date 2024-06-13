import { FileUploadRequestModel } from "./file.model";

export class ProductTicketCategoryMapModel {
  id: number | undefined = 0;
  productId: number | undefined = 0;
  ticketCategoryId: number | undefined = 0;
  ticketCategoryName: string | undefined;
  total: number | undefined= 0;
  available: number | undefined= 0;
  block: number | undefined= 0;
  sold: number | undefined= 0;
  price:number | undefined= 0;
  file: FileUploadRequestModel | undefined;
}
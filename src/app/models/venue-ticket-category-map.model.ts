import { FileUploadRequestModel } from "./file.model";

export class VenueTicketCategoryMapModel {
  id: number | undefined = 0;
  venueId: number | undefined = 0;
  ticketCategoryId: number | undefined = 0;
  ticketCategoryName: string | undefined;
  capacity: number | undefined= 0;
  amount:number | undefined= 0;
  file: FileUploadRequestModel | undefined;
}

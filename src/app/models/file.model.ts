export class FileUploadRequestModel {
    id: number | undefined=0;
    fileName: string | undefined;
    fileSize: string | undefined;
    fileType: number | undefined=1;
    fileAsBase64: string | undefined;
}
export class FileUploadRequestModel {
    fileName: string | undefined;
    fileSize: string | undefined;
    fileType: number | undefined=1;
    fileAsBase64: string | undefined;
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EnumModel } from 'src/app/models/common.model';
import { FileUploadRequestModel } from 'src/app/models/file.model';
import { CommonService } from './common.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class FileService {

    fileTypes: EnumModel[] | undefined = [];
    constructor(private http: HttpClient
        , private fb: FormBuilder
        , private commonService: CommonService
    ) {

        this.getPrimaryData();
    }

    getPrimaryData() {
        this.fileTypes = this.commonService.getPrimaryData()?.fileTypes;
    }

    get getProfileResume() {
        return 1;
    }

    getForm(model: FileUploadRequestModel): FormGroup {
        let form: FormGroup = this.fb.group({
            fileName: [model.fileName],
            fileSize: [model.fileSize],
            fileType: [model.fileType],
            fileAsBase64: [model.fileAsBase64],
        });
        return form;
    }

    Upload(model: FileUploadRequestModel) {
        const api = 'Media/Upload';
        return this.http.post<FileUploadRequestModel>(api, model);
    }
}
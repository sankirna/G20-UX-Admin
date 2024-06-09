import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PrimaryDataModel } from 'src/app/models/common.model';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    primaryData: PrimaryDataModel | undefined;

    constructor(private http: HttpClient
        , private router: Router
    ) {
        // this.getPrimaryData().subscribe(
        //     (response) => {
        //         this.primaryData = response;
        //     },
        //     (error) => {
        //       console.error(error);
        //     }
        //   );
    }

    getPrimaryDataFrom(): Observable<PrimaryDataModel> {
        const api = 'Common/GetPrimaryData';
        return this.http.post<PrimaryDataModel>(api, null);
    }

    setPrimaryData(data: PrimaryDataModel|undefined): void {
        this.primaryData = data;
    }

    getPrimaryData(): PrimaryDataModel | undefined {
        return this.primaryData;
    }

    newGuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

}

import { CommonService } from "./core/services/common.service";

export function initializeApp(commonService: CommonService): () => Promise<void> {
    return () =>
        commonService.getPrimaryDataFrom().toPromise().then(config => {
            commonService.setPrimaryData(config);
        });
}
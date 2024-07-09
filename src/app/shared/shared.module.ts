import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { LimitToPipe } from './pipes/limit-to.pipe';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ContentPlaceholderAnimationComponent } from './content-placeholder-animation/content-placeholder-animation.component';
import { LocalDatePipe } from './pipes/local-date.pipe';
import { YesNoPipe } from './pipes/yes-no.pipe';
import { LayoutComponent } from './layout/layout.component';
import { CustomPaginatorComponent } from './custom-paginator/custom-paginator.component';
import { ConfirmComponentDialogComponent } from './confirm-component-dialog/confirm-component-dialog.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NGX_MAT_DATE_FORMATS, NgxMatDateFormats, NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FilePreviewComponent } from './file-preview/file-preview.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';
import { QrCodeScannerComponent } from './qr-code-scanner/qr-code-scanner.component';
import { NgxEditorModule } from 'ngx-editor';


const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
    parse: {
      dateInput: "l, LTS"
    },
    display: {
      dateInput: "l, LTS",
      monthYearLabel: "MMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY"
    }
  };
  
@NgModule({
    imports: [
        RouterModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // NgxMatDatetimePickerModule,
        // NgxMatTimepickerModule,
        // NgxMatNativeDateModule,
    ],
    declarations: [
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LimitToPipe,
        LocalDatePipe,
        YesNoPipe,
        LayoutComponent,
        CustomPaginatorComponent,
        ConfirmComponentDialogComponent,
        YearPickerComponent,
        FileUploadComponent,
        FilePreviewComponent,
        QrCodeGeneratorComponent,
        QrCodeScannerComponent
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CustomMaterialModule,
        LimitToPipe,
        ConfirmDialogComponent,
        ContentPlaceholderAnimationComponent,
        LocalDatePipe,
        YesNoPipe,
        CustomPaginatorComponent,
        ConfirmComponentDialogComponent,
        YearPickerComponent,
        FileUploadComponent,
        FilePreviewComponent,
        QrCodeScannerComponent,
        // NgxMatDatetimePickerModule,
        // NgxMatTimepickerModule,
        // NgxMatNativeDateModule,
    ],
    // providers: [
    //     { provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }
    //   ]
})
export class SharedModule { }

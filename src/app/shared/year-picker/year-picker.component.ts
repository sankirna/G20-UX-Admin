import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['l', 'LL'],
        },
        display: {
          dateInput: 'YYYY',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => YearPickerComponent),
      multi: true
    }
  ],
})
export class YearPickerComponent implements ControlValueAccessor {
  selectedYearISOFormat?: string = moment().toISOString();
  year?: number;
  get selectedYear(): number {
    this.year = moment(this.selectedYearISOFormat).year();
    return this.year;
  }

  @Output() yearChanged: EventEmitter<number> = new EventEmitter<number>();

  onChange = (year: number) => { };
  onTouched = () => { };

  updateValue(year: number): void {
    this.year = year;
  }

  writeValue(year: number): void {
    this.year = year;
    this.updateValue(year);
  }

  registerOnChange(fn: (year: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setValue(year: number): void {
    this.year = year;
    this.onChange(this.year);
    this.onTouched();
    this.updateValue(year);
  }

  // customCalendarHeader = CustomCalendarHeaderComponent;


  public onYearSelected(momentInstance: moment.Moment) {
    this.selectedYearISOFormat = momentInstance.toISOString();
    this.year = momentInstance.year();
    this.setValue(this.year);
    this.yearChanged.emit(momentInstance.year());
  }
}

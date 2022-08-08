import { Component, OnInit } from '@angular/core';
import { HolidayService } from '../holiday.service';
import { Newrequest } from './new-request';
import { FormControl } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css'],
})
export class NewRequestComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
   
  holidays: Newrequest[] = [];
  /*date = new FormControl(new Date());*/
  constructor(private holidayService: HolidayService) {}

  ngOnInit(): void {}
  add(
    employee: string,
    dateRange: object,
    holidayType: string,
    holidayStatus: string
  ): void {
    this.holidayService
      .addHoliday({
        employee,
        dateRange,
        holidayType,
        holidayStatus,
      } as Newrequest)
      .subscribe((holiday) => {
        this.holidays.push(holiday);
      });
    /*this.date.reset()*/
  }

  /*reset() {
    this.date.setValue('');
  }*/
}

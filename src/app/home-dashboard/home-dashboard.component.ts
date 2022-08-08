import { Component, NgModule, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { HolidayService } from '../holiday.service';


@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css'],
})

/*export class HomeDashboardComponent implements OnInit {

newRequests : Newrequest[] = []

constructor(private holidayService: HolidayService) {}
getHolidays(): void {
this.holidayService.getHolidays().subscribe(newRequests => this.newRequests = newRequests)
}

ngOnInit(): void {
  this.getHolidays();
}
}*/
export class HomeDashboardComponent implements OnInit {
  dataSource: any = [];

  public displayedColumns = [
    '_id',
    'employee',
    'dateRange',
    'holidayType',
    'holidayStatus',
    'Delete',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  constructor(private holidayService: HolidayService) {}
  ngOnInit() {
    this.holidayService.getHolidays().subscribe((newRequests) => {
      this.dataSource = newRequests;
    });
  }
  delete(_id: string): void {
    this.holidayService.deleteHoliday(_id).subscribe();
    this.holidayService.getHolidays().subscribe((newRequests) => {
      this.dataSource = newRequests;
    });
  }
}

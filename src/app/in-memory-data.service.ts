import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Newrequest } from './new-request/new-request';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const requests= [
      { id: 1, employee: 'JC', startDate: '22082022' , endDate: '22092022', holidayType: 'summerholidays', holidayStatus: 'approved' },
      { id: 2, employee: 'JC2', startDate: '22082022' , endDate: '22092022', holidayType: 'summerholidays', holidayStatus: 'approved' },
      { id: 3, employee: 'JC3', startDate: '22082022' , endDate: '22092022', holidayType: 'summerholidays', holidayStatus: 'approved' },
      { id: 4, employee: 'JC4', startDate: '22082022' , endDate: '22092022', holidayType: 'summerholidays', holidayStatus: 'approved' },
      { id: 5, employee: 'JC5', startDate: '22082022' , endDate: '22092022', holidayType: 'summerholidays', holidayStatus: 'approved' },
      
    ];
    return {requests};
  }


  genId(requests: Newrequest[]): number {
    return requests.length > 0 ? Math.max(...requests.map(holiday => holiday.id)) + 1 : 11;
  }
}
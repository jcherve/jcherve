import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Newrequest } from './new-request/new-request';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HolidayService {
  private holidayUrl = 'http://localhost:3000/api/requestHoliday';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<Newrequest[]> {
    return this.http.get<Newrequest[]>(this.holidayUrl).pipe(
      tap((_) => console.log(`fetched holidays`, _)),
      catchError(this.handleError<Newrequest[]>(`getHolidays`))
    );
  }
  /** POST: add a new holiday to the server */
  addHoliday(holiday: Newrequest): Observable<Newrequest> {
    return this.http
      .post<Newrequest>(this.holidayUrl, holiday, this.httpOptions)
      .pipe(
        tap((newHoliday: Newrequest) => console.log(`added holiday`)),
        catchError(this.handleError<Newrequest>('addHoliday'))
      );
  }

  /** DELETE: delete the holiday request from the server */
  deleteHoliday(_id: string): Observable<Newrequest> {
    const url = `${this.holidayUrl}/${_id}`;
    return this.http.delete<Newrequest>(url, this.httpOptions).pipe(
      tap((_) => console.log(`deleted holiday id=${_id}`)),
      catchError(this.handleError<Newrequest>('deleteHoliday'))
    );
  }
}
/*
  constructor () {}
  getHolidays(): Observable<Newrequest[]>{
  
 const newRequests = of(NEWREQUESTS);
 return newRequests}
  }*/

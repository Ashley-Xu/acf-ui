import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcfServiceService {

  constructor(private http: HttpClient) { }

   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  utUrl = 'http://localhost:8080/acf-api/acf/ut';

  cubeUrl = 'http://localhost:8080/acf-api/acf/rcube';

  getUnderlyingTree(n: number, t: number, poc_0: number, sigma: number) {
    const input = {
      n,
      t,
      poc_0,
      sigma,
      // rf: 0.05,
      // pop_0: 350,
      // aoc: 0.15,
      // coo: 100,
      // realOptions: [
      //   {
      //     gainOrLoss: 0,
      //     salesLevel: 10000
      //   },
      //   {
      //     gainOrLoss: -250000,
      //     salesLevel: 20000
      //   },
      //   {
      //     gainOrLoss: 0,
      //     salesLevel: 0
      //   }
      // ]
    };

    return this.http.post<any>(this.utUrl, input, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCube(n: number, t: number, poc_0: number, sigma: number, rf: number, pop_0: number, aoc: number, coo: number, realOptions: {gainOrLoss: number, salesLevel: number}[] ) {
    const input = {
      n,
      t,
      poc_0,
      sigma,
      rf,
      pop_0,
      aoc,
      coo,
      realOptions
    };

    return this.http.post<any>(this.cubeUrl, input, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}

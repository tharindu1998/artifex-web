
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService implements Resolve<any>
{
  widgets: any[];

  constructor(
    private _httpClient: HttpClient
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
  {
      return new Promise((resolve, reject) => {

          Promise.all([
              this.getWidgets()
          ]).then(
              () => {
                  resolve();
              },
              reject
          );
      });
  }

  /**
   * Get widgets
   *
   * @returns {Promise<any>}
   */
  getWidgets(): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get('api/analytics-dashboard-widgets')
              .subscribe((response: any) => {
                  this.widgets = response;
                  resolve(response);
              }, reject);
      });
  }


  getAllAnalyticsdata(id:string): Promise<any>
  {
      return new Promise((resolve, reject) => {
          this._httpClient.get(`post/api/statitics/${id}`,{observe: 'response'})
              .subscribe((response: any) => {
                  this.widgets = response;
                  resolve(response);
              }, reject);
      });
  }

//   getAllRequests(id:string):Observable<any>{                                         //requestedPersonId should be sent to get all the requests related to the user
//     return this._httpClient.get<any>(`${this.getAllAnalyticsData}/${id}`,{observe: 'response'})
//   }

 // }


}


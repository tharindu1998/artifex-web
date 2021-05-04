import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { SecuritySettings, ISecuritySettings } from 'app/shared/model/securitySettings/securitySettings.model';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root'
  })

  export class SecuritySettingsService{
    public resourceUrl = environment.services_prefix +'userprofile/api/security-settings-by-userId';
   
    constructor(
        private http: HttpClient
      ) { }

      setSecuritySettingsDetails(securitySettingsDetails) : Observable<HttpResponse<any>> {
        return this.http.post<any>(this.resourceUrl,securitySettingsDetails,{observe: 'response'});
      }

      getSecuritySettingsDetails(id :string):Observable<HttpResponse<ISecuritySettings>>{
        return this.http.get<ISecuritySettings>(`${this.resourceUrl}/${id}`,{observe:'response'});
      }
  }
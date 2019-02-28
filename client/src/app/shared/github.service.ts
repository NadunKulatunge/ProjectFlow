import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getGithubUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/github');
  }

  getGithubOpenIssues() {
    return this.http.get(environment.apiBaseUrl + '/githubopenissues');
  }

}

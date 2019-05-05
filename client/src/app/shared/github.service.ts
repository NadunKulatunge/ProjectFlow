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

  getGithubOpenIssues(projectID) {
    return this.http.get(environment.apiBaseUrl + '/githubopenissues/'+projectID);
  }

  getGithubClosedIssues(projectID) {
    return this.http.get(environment.apiBaseUrl + '/githubclosedissues/'+projectID);
  }

  getGithubIssueCount(projectID, type, state) {
    return this.http.get(environment.apiBaseUrl + '/githubissuecount/'+projectID+'/'+type+"/"+state);
  }

  getGithubIssueFromNumber(projectID, issueNumber) {
    return this.http.get(environment.apiBaseUrl + '/githubGetIssueFromNumber/'+projectID+'/'+issueNumber);
  }

  getGithubSprintDetails(sprintID, projectID) {
    return this.http.get(environment.apiBaseUrl + '/githubSprintDetails/'+sprintID+'/'+projectID);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  newIssue = {
    title: '',
    labels: '',
    assignees: '',
    body: '',
  };

  editIssue = {
    title: '',
    labels: '',
    assignees: '',
    state: '',
    body: '',
  };

  constructor(private http: HttpClient) { }

  getGithubUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/github');
  }

  getGithubOpenIssues(projectID, page) {
    return this.http.get(environment.apiBaseUrl + '/githubopenissues/'+projectID+'/'+page);
  }

  getGithubClosedIssues(projectID, page) {
    return this.http.get(environment.apiBaseUrl + '/githubclosedissues/'+projectID+'/'+page);
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

  githubCreateIssue(projectID, newIssue){
    return this.http.post(environment.apiBaseUrl + '/github/issue/create/'+projectID, newIssue);
  }

  githubEditIssue(projectID, issueNumber, editIssue){
    return this.http.put(environment.apiBaseUrl + '/github/issue/edit/'+projectID+'/'+issueNumber, editIssue);
  }

  githubLogout(){
    return this.http.delete(environment.apiBaseUrl + '/github/logout');
  }

}

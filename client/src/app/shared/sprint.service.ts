import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Sprint } from './sprint.model';
import { SprintItem } from './sprintitem.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  selectedSprint: Sprint = {
    title: '',
    startDate: '',
    endDate: '',
    projectID: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

    //HttpMethods

    //Sprints
    createSprint(sprint: Sprint) {
      return this.http.post(environment.apiBaseUrl+'/sprint/create',sprint);
    }
  
    getSprints(projectID){
      return this.http.get(environment.apiBaseUrl+'/sprints/'+projectID);
    }
  
    getSprint(projectID, sprintID){
      return this.http.get(environment.apiBaseUrl+'/sprint/'+projectID+'/'+sprintID);
    }
  
    createSprintItem(sprintitem: SprintItem) {
      return this.http.post(environment.apiBaseUrl+'/sprintitem/create',sprintitem);
    }
  
    getSprintItems(projectID, sprintID){
      return this.http.get(environment.apiBaseUrl+'/sprintitems/'+projectID+'/'+sprintID);
    }
  
    getIssuesAddedToSprints(projectID){
      return this.http.get(environment.apiBaseUrl+'/issuesAddedToSprints/'+projectID);
    }
  
    getSprintItemDetails(issueNumber, projectID){
      return this.http.get(environment.apiBaseUrl+'/sprintitem/'+projectID+'/'+issueNumber);
    }
    
    removeSprintItem(projectID, sprintID, issueNumber){
      return this.http.delete(environment.apiBaseUrl+'/sprintitem/'+projectID+'/'+sprintID+'/'+issueNumber);
    }
}

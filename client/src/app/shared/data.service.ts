import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Project } from './project.model';
import { Sprint } from './sprint.model';
import { SprintItem } from './sprintitem.model';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  selectedProject: Project = {
    title: '',
    githubURL: '',
    githubPartURL: '',
    description: '',
    userID: ''
  };

  selectedSprint: Sprint = {
    title: '',
    startDate: '',
    endDate: '',
    projectID: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private userService: UserService) { }
 
  //HttpMethods

  //Projects
  createProject(project: Project) {
    return this.http.post(environment.apiBaseUrl+'/project/create',project);
  }

  getProjects() {
    return this.http.get(environment.apiBaseUrl + '/userprojects');
  }

  getProjectInfo(id) {
    return this.http.get(environment.apiBaseUrl + '/projectinfo/'+id);
  }

  //Sprints
  createSprint(sprint: Sprint) {
    return this.http.post(environment.apiBaseUrl+'/sprint/create',sprint);
  }

  getSprints(pid){
    return this.http.get(environment.apiBaseUrl+'/sprints/'+pid);
  }

  getSprint(pid, sid){
    return this.http.get(environment.apiBaseUrl+'/sprint/'+pid+'/'+sid);
  }

  createSprintItem(sprintitem: SprintItem) {
    return this.http.post(environment.apiBaseUrl+'/sprintitem/create',sprintitem);
  }

  getSprintItems(pid, sid){
    return this.http.get(environment.apiBaseUrl+'/sprintitems/'+pid+'/'+sid);
  }

  getProjectIssuesAddedToSprints(pid){
    return this.http.get(environment.apiBaseUrl+'/projectIssuesAddedToSprints/'+pid);
  }

  getSprintItemDetails(issueNumber, pid){
    return this.http.get(environment.apiBaseUrl+'/sprintitem/'+pid+'/'+issueNumber);
  }

 
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  selectedProject: Project = {
    title: '',
    githubURL: '',
    githubPartURL: '',
    description: '',
    userID: ''
  };

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods

  //Projects
  createProject(project: Project) {
    return this.http.post(environment.apiBaseUrl+'/project/create',project);
  }

  removeProject(projectID) {
    return this.http.delete(environment.apiBaseUrl+'/project/'+projectID);
  }

  getProjects() {
    return this.http.get(environment.apiBaseUrl + '/projects');
  }

  getProjectInfo(projectID) {
    return this.http.get(environment.apiBaseUrl + '/project/'+projectID);
  }
}

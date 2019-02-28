import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Project } from './project.model';
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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private userService: UserService) { }
 
  //HttpMethods

  createProject(project: Project) {
    return this.http.post(environment.apiBaseUrl+'/project/create',project);
  }

  getProjects() {
    return this.http.get(environment.apiBaseUrl + '/userprojects');
  }

  getProjectInfo(id) {
    return this.http.get(environment.apiBaseUrl + '/projectinfo/'+id);
  }



 
}

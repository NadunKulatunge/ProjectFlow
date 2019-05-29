import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { ProjectService } from '../shared/project.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css']
})
export class ProjectEditComponent implements OnInit {

  userDetails;
  userID;
  githubPartURL;
  urlsplit;
  url;

  pid;
  project;
  title;
  description;
  projectID;
  githubURL;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    private _location: Location, 
    private projectService: ProjectService, 
    private router : Router, 
    private userService: UserService, 
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.getProjectInformation(this.pid); //Parameter Protection

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userID = this.userDetails._id;
      },
      err => { 
        console.log(err);      
      }
    );
  }

  getProjectInformation(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
        this.title = this.project.title;
        this.description = this.project.description;
        this.githubURL = this.project.githubURL;

        this.projectService.selectedProject.title = this.title;
        this.projectService.selectedProject.description = this.description;
        this.projectService.selectedProject.githubURL = this.githubURL;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err.status);
        
      }
    );
  }


  onSubmit(form: NgForm) {
    this.url = form.value.githubURL;
    this.urlsplit = this.url.split("/").slice(-2);
    this.githubPartURL = this.urlsplit[0]+"/"+this.urlsplit[1];
  
    let newItem: Project = {
      title: form.value.title,
      githubURL: form.value.githubURL,
      githubPartURL: this.githubPartURL,
      description: form.value.description,
      userID: this.userID
    }

    this.projectService.editProject(newItem, this.pid).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else {
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
        }
      }
    );
  }

  resetForm(form: NgForm) {
    this.projectService.selectedProject = {
      title: '',
      githubURL: '',
      githubPartURL: '',
      description: '',
      userID: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  
  goBack(){
    this._location.back();
  }

}
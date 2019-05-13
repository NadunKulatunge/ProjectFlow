import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-project-create-issue',
  templateUrl: './project-create-issue.component.html',
  styleUrls: ['./project-create-issue.component.css']
})
export class ProjectCreateIssueComponent implements OnInit {

  pid;
  project;
  projectTitle;
  projectID;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(private projectService: ProjectService, private sprintService: SprintService, private router : Router, private userService: UserService, private githubService: GithubService,  private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.getProjectInfo(this.pid); //Parameter Protection

  }

  //// HTTP Methods

  //Get the Info related to the Project & Parameter Protection
  getProjectInfo(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
        this.projectTitle = this.project.title;
        this.projectID = this.project._id;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        
      }
    );
  }

  onSubmit(form: NgForm) {
  
    let newIssue = {
      title: form.value.title,
      body: form.value.body,

    }

    this.githubService.githubCreateIssue(this.pid, newIssue).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {this.showSucessMessage = false;}, 4000);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = err.error.message;
      }
    );

  }



  resetForm(form: NgForm) {
    this.githubService.newIssue = {
      title: '',
      body: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}

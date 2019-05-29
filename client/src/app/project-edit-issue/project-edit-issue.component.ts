import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { UserService } from '../shared/user.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-project-edit-issue',
  templateUrl: './project-edit-issue.component.html',
  styleUrls: ['./project-edit-issue.component.css']
})
export class ProjectEditIssueComponent implements OnInit {

  pid;
  iid;
  project;
  projectTitle;
  projectID;
  issueInfo;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  constructor(
    private _location: Location, 
    private projectService: ProjectService, 
    private sprintService: SprintService, 
    private router : Router, 
    private userService: UserService, 
    private githubService: GithubService,  
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid']; //project ID
    this.iid=this._Activatedroute.snapshot.params['iid']; //Issue Number

    this.getProjectInfo(this.pid); //Parameter Protection
    this.getIssueInfo(this.pid, this.iid)
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

  getIssueInfo(projectID, issueNumber) {
    this.githubService.getGithubIssueFromNumber(projectID, issueNumber).subscribe(
      res => {
        console.log(res)
        this.issueInfo = res;
        this.githubService.editIssue.title = this.issueInfo.title;
        this.githubService.editIssue.body = this.issueInfo.body;
        this.githubService.editIssue.state = this.issueInfo.state;

        //Get Labels as comma seperated values
        var i;
        var labelsArray = new Array();
        for(i = 0; i < this.issueInfo.labels.length; ++i){
          labelsArray.push(this.issueInfo.labels[i].name)
        }
        this.githubService.editIssue.labels = labelsArray.join(", ");

        //Get assignees as comma seperated values
        var assigneesArray = new Array();
        for(i = 0; i < this.issueInfo.assignees.length; ++i){
          assigneesArray.push(this.issueInfo.assignees[i].login)
        }
        this.githubService.editIssue.assignees = assigneesArray.join(", ");

      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigate(['/404']);
        }
        
      }
    );
  }

  onSubmit(form: NgForm) {
  
    let editIssue = {
      title: form.value.title,
      labels: form.value.labels,
      assignees: form.value.assignees,
      state: form.value.state,
      body: form.value.body,

    }

    this.githubService.githubEditIssue(this.pid, this.iid, editIssue).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {this.showSucessMessage = false; this._location.back();}, 2000);
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
    this.githubService.editIssue = {
      title: '',
      labels: '',
      assignees: '',
      state: '',
      body: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  goBack(){
    this._location.back();
  }
  
}

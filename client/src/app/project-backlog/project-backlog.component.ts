import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';
import { SprintItem } from '../shared/sprintitem.model';

import { ReadMoreComponent } from '../read-more/read-more.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})
export class ProjectBacklogComponent implements OnInit {

  
  pid;
  response;
  project;
  projectID;
  githubOpenIssues;
  sprints;
  data;
  issuesAddedToSprints;
  issuesNumberToSprintTitle;
  sprintItemDetails;
  sprintItemSprintTitle;

  serverErrorMessages;

  constructor(
    private githubService: GithubService, 
    private projectService: ProjectService,
    private sprintService: SprintService, 
    private _Activatedroute:ActivatedRoute, 
    private router : Router,
    private _location: Location) { }

  ngOnInit() {

    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];
    
    this.getProjectInfo(this.pid); //Parameter Protection

    this.getGithubOpenIssues(this.pid);

    this.getSprints(this.pid);

    this.getIssuesAddedToSprints(this.pid);
    
  }

  //// HTTP Methods

  //Get the Info related to the Project & Parameter Protection
  getProjectInfo(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.response = res;
        this.project = this.response.project;
        this.projectID = this.project._id;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigate(['/404']);
        }
      }
    );
  }

  //To get Open Issues related to the Project
  getGithubOpenIssues(projectID){
    this.githubService.getGithubOpenIssues(projectID).subscribe(
      res => {
        this.response = res;
        this.githubOpenIssues = this.response.items
      },
      err => { 
        console.log(err);
      }
    );
  }

  //To get Sprints related to the Project
  getSprints(projectID){
    this.sprintService.getSprints(projectID).subscribe(
      res => {
        this.response = res;
        this.sprints = this.response.result;
      },
      err => { 
        console.log(err); 
      }
    );
  }

  //Get the Open Issues that have been Added to Sprints 
  getIssuesAddedToSprints(projectID) {
    this.sprintService.getIssuesAddedToSprints(projectID).subscribe(
      res => {
        
        this.response = res;
        this.data = this.response.result;

        //Contains [issueNumbers] that have been added to any sprint ex: [3, 5]
        this.issuesAddedToSprints = this.data.map(({ issueNumber }) => issueNumber)

        //Contains [issueNumber => sprintTitle] map ex: {3 => "Sprint 1", 5 => "Sprint 1"}
        this.issuesNumberToSprintTitle = new Map(this.data.map(i => [i.issueNumber, i.sprintTitle]));
      },
      err => { 
        console.log(err);
      }
    );
  }

  //Add issue to sprint
  addToSprint(issueNumber, sprintID, sprintTitle){
  
    let newItem: SprintItem = {
      sprintID: sprintID,
      projectID: this.projectID,
      issueNumber: issueNumber,
      sprintTitle: sprintTitle
    }

    this.sprintService.createSprintItem(newItem).subscribe(
      res => {
        this.addIssueToSprintArray(issueNumber);
        this.addIssueTitleToSprintArray(issueNumber, sprintTitle);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong. Please contact admin.';
      }
      
    );
  }

  ////Helper Methods

  //To check if issue is Added to a Sprint using IssueNumber
  isAddedToSprint(issueNumber){
    return this.issuesAddedToSprints.includes(issueNumber);
  }

  //To add a new IssueNumber to issue array
  addIssueToSprintArray(issueNumber){
    this.issuesAddedToSprints.push(issueNumber);
  }

  addIssueTitleToSprintArray(issuenumber, title){
    this.issuesNumberToSprintTitle.set(issuenumber, title);
  }

  getSprintItemSprintTitle(issueNumber){
    return this.issuesNumberToSprintTitle.get(issueNumber);
  }

  isOpenIssueItemsEmpty(){
    if(this.githubOpenIssues!=undefined && this.githubOpenIssues[0]){
      return true;
    } else {
      return false;
    }
  }

  goBack(){
    this._location.back();
  }

}

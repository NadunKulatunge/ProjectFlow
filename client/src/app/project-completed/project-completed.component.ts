import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-project-completed',
  templateUrl: './project-completed.component.html',
  styleUrls: ['./project-completed.component.css']
})
export class ProjectCompletedComponent implements OnInit {

  pid;
  project;
  projectID;
  githubClosedIssues;
  page;
  pagesCount;
  response;
  loadMoreLoading = false;
  closedIssueCount;

  constructor(
    private githubService: GithubService, 
    private _Activatedroute:ActivatedRoute, 
    private projectService: ProjectService, 
    private router : Router,
    private _location: Location) { }

  ngOnInit() {

    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];
    this.page = 1;

    this.getProjectInfo(this.pid); //Parameter Protection

    this.getGithubClosedIssues(this.pid);
    this.getGithubClosedIssueCount(this.pid)

  }

  //// HTTP Methods

  //Get the Info related to the Project & Parameter Protection
  getProjectInfo(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
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

  //Get the Closed issues of the project
  getGithubClosedIssues(projectID){
    this.githubService.getGithubClosedIssues(projectID, 1).subscribe(
      res => {
        this.githubClosedIssues = res;
        this.githubClosedIssues = this.githubClosedIssues.items
      },
      err => { 
        console.log(err);
      }
    );
  }

  getMoreIssues(projectID){
    this.loadMoreLoading = true;
    this.githubService.getGithubClosedIssues(projectID, this.page+1).subscribe(
      res => {
        this.page = this.page+1;
        this.response = res;
        this.githubClosedIssues = [...this.githubClosedIssues, ...this.response.items]
        this.loadMoreLoading = false;
      },
      err => { 
        console.log(err);
        this.loadMoreLoading = false;
      }
    );
  }

  isLoadMoreAvailable(){
    if(this.page>=this.pagesCount){
      return false
    }else{
      return true
    }
  }



  //To get the open issue count
  getGithubClosedIssueCount(projectID){
    this.githubService.getGithubIssueCount(projectID, 'issue', 'closed').subscribe(
      res => {
        this.response = res;
        this.closedIssueCount = this.response.total_count;
        this.pagesCount = Math.round(this.closedIssueCount/30);
        console.log(this.pagesCount)
        
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  isClosedIssueItemsEmpty(){
    if(this.githubClosedIssues!=undefined && this.githubClosedIssues[0]){
      return true;
    } else {
      return false;
      
    }
  }

  goBack(){
    this._location.back();
  }

}


  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';

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

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private projectService: ProjectService, private router : Router) { }

  ngOnInit() {

    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.getProjectInfo(this.pid); //Parameter Protection

    this.getGithubClosedIssues(this.pid);

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
    this.githubService.getGithubClosedIssues(projectID).subscribe(
      res => {
        this.githubClosedIssues = res;
        this.githubClosedIssues = this.githubClosedIssues.items
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

}


  
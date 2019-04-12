import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';


@Component({
  selector: 'app-project-profile',
  templateUrl: './project-profile.component.html',
  styleUrls: ['./project-profile.component.css']
})
export class ProjectProfileComponent implements OnInit {

  pid;
  project;
  title;
  description;
  projectID;
  githubURL;
  alldata;
  
  openIssueCount=0;
  closedIssueCount=0;
  openPullRequestCount=0;
  closedPullRequestCount=0;

  totalPullRequestCount=0;
  totalIssueCount=0;

  totalTaskCount=0;
  totalOpenTaskCount=0;
  totalClosedTaskCount=0;

  projectProgress;
  closedIssueProgress;
  closedPullRequestProgress;
  openTaskProgress;
  openIssueProgress;
  openPullRequestProgress;

  projectProgressPercentage;

  githubOpenIssues;

  sprints;

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.dataService.getProjectInfo(this.pid).subscribe(
      res => {
        
        this.project = res;
        this.project = this.project.project;
        this.title = this.project.title;
        this.description = this.project.description;
        this.githubURL = this.project.githubURL;
        console.log(this.project);
        console.log(this.title)
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err);
        
      }
    );

    //Open issue count
    this.githubService.getGithubIssueCount(this.pid, 'issue', 'open').subscribe(
      res => {
        
        this.alldata = res;
        this.openIssueCount = this.alldata.total_count;
        console.log(this.openIssueCount);
        this.updateCount();
      },
      err => { 
        console.log(err);
        
      }
    );

    //Closed issue count
    this.githubService.getGithubIssueCount(this.pid, 'issue', 'closed').subscribe(
      res => {
        this.alldata = res;
        this.closedIssueCount = this.alldata.total_count;
        console.log(this.closedIssueCount);
        this.updateCount();
      },
      err => { 
        console.log(err);
        
      }
    );

    //Open pull-request count
    this.githubService.getGithubIssueCount(this.pid, 'pull-request', 'open').subscribe(
      res => {
        this.alldata = res;
        this.openPullRequestCount = this.alldata.total_count;
        console.log(this.openPullRequestCount);
        this.updateCount();
      },
      err => { 
        console.log(err);
        
      }
    );

    this.githubService.getGithubIssueCount(this.pid, 'pull-request', 'closed').subscribe(
      res => {
        this.alldata = res;
        this.closedPullRequestCount = this.alldata.total_count;
        console.log(this.closedPullRequestCount);
        this.updateCount();
      },
      err => { 
        console.log(err);
        
      }
    );

    //get all the sprints
    this.dataService.getSprints(this.pid).subscribe(
      res => {
        this.sprints = res;
        this.sprints = this.sprints.result;
        //console.log(this.sprints)
      },
      err => { 
        console.log(err);
        
      }
    );

    
  }

  updateCount() {
    

    this.totalIssueCount =  this.openIssueCount + this.closedIssueCount;
    this.totalPullRequestCount =  this.openPullRequestCount + this.closedPullRequestCount;

    this.totalOpenTaskCount = this.openIssueCount + this.openPullRequestCount;
    this.totalClosedTaskCount = this.closedIssueCount + this.closedPullRequestCount;
    this.totalTaskCount =  this.openIssueCount + this.closedIssueCount + this.openPullRequestCount + this.closedPullRequestCount;

    this.projectProgress = ((this.totalClosedTaskCount/this.totalTaskCount)*100).toFixed(1);
    this.closedIssueProgress = ((this.closedIssueCount/this.totalTaskCount)*100).toFixed(1);
    this.closedPullRequestProgress = ((this.closedPullRequestCount/this.totalTaskCount)*100).toFixed(1);

    this.openIssueProgress = ((this.openIssueCount/this.totalTaskCount)*100).toFixed(1);
    this.openPullRequestProgress = ((this.openPullRequestCount/this.totalTaskCount)*100).toFixed(1);
    this.openTaskProgress = ((this.totalOpenTaskCount/this.totalTaskCount)*100).toFixed(1);
    
  }

}


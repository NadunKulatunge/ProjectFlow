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

  error;
  sprintDetails= [];
  sprintOpenIssues= [];
  sprintClosedIssues= [];
  sprintClosedIssuePercentages= [];

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
        console.log(err.status);
        
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
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
        
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
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
        
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
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
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
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
      }
    );

    //get all the sprints
    this.dataService.getSprints(this.pid).subscribe(
      res => {
        this.sprints = res;
        this.sprints = this.sprints.result;
        //console.log(this.sprints)

        //Get Sprint Details for each sprint
        this.sprints.forEach( (myObject, index) => {

          console.log(myObject._id);
          this.githubService.getGithubSprintDetails(myObject._id, myObject.projectID).subscribe(
            res => {
              console.log(res);
              this.sprintOpenIssues.push(res[0]['openIssues']);
              this.sprintClosedIssues.push(res[0]['closedIssues']);
              this.sprintClosedIssuePercentages.push( ((res[0]['closedIssues']/(res[0]['closedIssues']+res[0]['openIssues'])) *100).toFixed(1) )
              console.log(this.sprintOpenIssues)
              console.log(this.sprintClosedIssues)
              console.log(this.sprintClosedIssuePercentages)
            },
            err => { 
              console.log(err);
            }
          )
          
        });

      },
      err => { 
        console.log(err);
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
        
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


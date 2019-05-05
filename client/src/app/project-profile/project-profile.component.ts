import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';

import { Chart } from 'chart.js';

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
  
  openIssueCount;
  closedIssueCount;
  openPullRequestCount;
  closedPullRequestCount;

  totalPullRequestCount;
  totalIssueCount;

  totalTaskCount;
  totalOpenTaskCount;
  totalClosedTaskCount;

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

  chart: Chart;
  sprintOpenIssuesTotal= 0;
  count = 0;

  constructor(private githubService: GithubService, private projectService: ProjectService, private sprintService: SprintService, private _Activatedroute:ActivatedRoute, private router : Router) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.getProjectInformation(this.pid); //Parameter Protection
    
    this.getGithubOpenIssueCount(this.pid); //Open Issue Count
    this.getGithubClosedIssueCount(this.pid); //Closed issue count

    this.getGithubOpenPullRequestCount(this.pid); //Open Pull-Request Count
    this.getGithubClosedPullRequestCount(this.pid); //Closed Pull-Request count

    this.getSprints(this.pid); //getSprints and progress
    
  }

  getProjectInformation(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
        this.title = this.project.title;
        this.description = this.project.description;
        this.githubURL = this.project.githubURL;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err.status);
        
      }
    );
  }

  //Open issue count
  getGithubOpenIssueCount(projectID){
    this.githubService.getGithubIssueCount(projectID, 'issue', 'open').subscribe(
      res => {
        this.alldata = res;
        this.openIssueCount = this.alldata.total_count;
        this.updateCount();
      },
      err => { 
        console.log(err);
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
        
      }
    );
  }

  getGithubClosedIssueCount(projectID){
    this.githubService.getGithubIssueCount(projectID, 'issue', 'closed').subscribe(
      res => {
        this.alldata = res;
        this.closedIssueCount = this.alldata.total_count;
        this.updateCount();
      },
      err => { 
        console.log(err);
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
        
      }
    );
  }

  getGithubOpenPullRequestCount(projectID){
    this.githubService.getGithubIssueCount(projectID, 'pull-request', 'open').subscribe(
      res => {
        this.alldata = res;
        this.openPullRequestCount = this.alldata.total_count;
        this.updateCount();
      },
      err => { 
        console.log(err);
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
      }
    );


  }

  getGithubClosedPullRequestCount(projectID){
    this.githubService.getGithubIssueCount(projectID, 'pull-request', 'closed').subscribe(
      res => {
        this.alldata = res;
        this.closedPullRequestCount = this.alldata.total_count;
        this.updateCount();
      },
      err => { 
        console.log(err);
        if(err.status == 403){
          this.error = "You do not have permission to access this repository or repository not found. Make sure that you have necessary permissions to access this repository or try re-login to GitHub."
        }
      }
    );
  }

  getSprints(projectID){
    this.sprintService.getSprints(projectID).subscribe(
      res => {
        this.sprints = res;
        this.sprints = this.sprints.result;

        //Get Sprint Details for each sprint
        this.sprints.forEach( (myObject, index) => {

          this.githubService.getGithubSprintDetails(myObject._id, myObject.projectID).subscribe(
            res => {
              this.sprintOpenIssues.push(res[0]['openIssues']);
              this.sprintClosedIssues.push(res[0]['closedIssues']);
              this.sprintClosedIssuePercentages.push( ((res[0]['closedIssues']/(res[0]['closedIssues']+res[0]['openIssues'])) *100).toFixed(1) )
              this.countSprintOpenIssuesTotal();
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

    this.projectProgress = ((this.totalClosedTaskCount/this.totalTaskCount)*100).toFixed(1) ;
    this.closedIssueProgress = ((this.closedIssueCount/this.totalTaskCount)*100).toFixed(1);
    this.closedPullRequestProgress = ((this.closedPullRequestCount/this.totalTaskCount)*100).toFixed(1) ;

    this.openIssueProgress = ((this.openIssueCount/this.totalTaskCount)*100).toFixed(1) ;
    this.openPullRequestProgress = ((this.openPullRequestCount/this.totalTaskCount)*100).toFixed(1) ;
    this.openTaskProgress = ((this.totalOpenTaskCount/this.totalTaskCount)*100).toFixed(1);
    this.generateChart()
  }

  countSprintOpenIssuesTotal() {
    this.sprintOpenIssuesTotal= 0;
    for (let i of this.sprintOpenIssues) {
      console.log("count" + i)
      this.sprintOpenIssuesTotal = this.sprintOpenIssuesTotal + i;
    }
    this.generateChart()
  }


  generateChart(){
    this.count = this.count + 1;

    if (this.chart) this.chart.destroy();

    if(this.count>3){
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [this.totalOpenTaskCount-this.sprintOpenIssuesTotal, this.sprintOpenIssuesTotal, this.totalClosedTaskCount],
            backgroundColor: ["#dc3545", "#28a745", "#007bff"]
          }],
    
          labels: [
              'To-Do',
              'In-Progress',
              'Completed'
          ]
        }
      })
    }

    
    
  }

  NaNValidate(value) {
    if(isNaN(value)){
      return 0;
    }else{
      return value;
    }
  }

  isLoading() {
    if (this.count>3){
      return false
    }else{
      return true;
    }
  }
}


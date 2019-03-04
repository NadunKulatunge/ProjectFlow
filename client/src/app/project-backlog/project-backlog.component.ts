import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';
import { SprintItem } from '../shared/sprintitem.model';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})
export class ProjectBacklogComponent implements OnInit {

  pid;
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

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.pid=this._Activatedroute.snapshot.params['pid'];

    //Params Protection
    this.dataService.getProjectInfo(this.pid).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
        this.projectID = this.project._id;
        //console.log(this.project);
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err);
        
      }
    );

    this.githubService.getGithubOpenIssues(this.pid).subscribe(
      res => {
        //this.userDetails = res['user'];
        //console.log(res);
        this.githubOpenIssues = res;
        this.githubOpenIssues = this.githubOpenIssues.items
        //console.log(this.githubOpenIssues)
      },
      err => { 
        console.log(err);
        
      }
    );

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

    this.dataService.getProjectIssuesAddedToSprints(this.pid).subscribe(
      res => {
        console.log(res);
        this.data = res;
        this.data = this.data.result;
        //console.log(this.data)
        this.issuesAddedToSprints = this.data.map(({ issueNumber }) => issueNumber)
        console.log(this.issuesAddedToSprints)

        this.issuesNumberToSprintTitle = new Map(this.data.map(i => [i.issueNumber, i.sprintTitle]));
        console.log(this.issuesNumberToSprintTitle)
      },
      err => { 
        console.log(err);
        
      }
    );
    

  }

  addToSprint(issueNumber, sprintID, sprintTitle){
  
    let newItem: SprintItem = {
      sprintID: sprintID,
      projectID: this.projectID,
      issueNumber: issueNumber,
      sprintTitle: sprintTitle

    }
    //console.log(newItem);

    this.dataService.createSprintItem(newItem).subscribe(
      res => {
        //console.log(res)
        this.addIssueToSprintArray(issueNumber);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
      
    );
  }

  isAddedToSprint(issueNumber){
    return this.issuesAddedToSprints.includes(issueNumber);
  }

  addIssueToSprintArray(issueNumber){
    this.issuesAddedToSprints.push(issueNumber);
  }

  getSprintItemDetails(issueNumber){
    this.dataService.getSprintItemDetails(issueNumber, this.pid).subscribe(
      res => {
        this.sprintItemDetails = res;
        console.log(this.sprintItemDetails)
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  getSprintItemSprintTitle(issueNumber){
    this.dataService.getSprintItemDetails(issueNumber, this.pid).subscribe(
      res => {
        this.sprintItemDetails = res;
        this.sprintItemDetails = this.sprintItemDetails.result;
        this.sprintItemSprintTitle = this.sprintItemDetails.sprintTitle;
        console.log(this.sprintItemSprintTitle)
      },
      err => { 
        console.log(err);
        
      }
    );
    return this.sprintItemSprintTitle ;
  }


}

import { Component, OnInit } from '@angular/core';
import { SprintService } from '../shared/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-project-sprint',
  templateUrl: './project-sprint.component.html',
  styleUrls: ['./project-sprint.component.css']
})
export class ProjectSprintComponent implements OnInit {

  pid;
  sid;
  sprintItems;
  projectID;
  sprint;
  sprintTitle;
  sprintItem;
  issueItems = [];

  serverErrorMessages;

  constructor(private _location: Location, private githubService: GithubService, private sprintService: SprintService, private _Activatedroute:ActivatedRoute, private router : Router) { }

  ngOnInit() {
    this.pid=this._Activatedroute.snapshot.params['pid'];
    this.sid=this._Activatedroute.snapshot.params['sid'];

    //Params Protection
    this.sprintService.getSprint(this.pid, this.sid).subscribe(
      res => {
        this.sprint = res;
        this.sprint = this.sprint.result;
        this.sprintTitle = this.sprint[0].title;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err);
        
      }
    );

    this.sprintService.getSprintItems(this.pid, this.sid).subscribe(
      res => {
        this.sprintItems = res;
        this.sprintItems = this.sprintItems.result;

        for (let num in this.sprintItems) {
          this.githubService.getGithubIssueFromNumber(this.pid, this.sprintItems[num].issueNumber).subscribe(
            res => {
              this.issueItems.push(res);
            },
            err => { 
              console.log(err);
              
            }
          );
          
        }


      },
      err => {  
        console.log(err);
        
      }
    );


  }

  isIssueOpen(state){
    if(state == 'open'){
      return true;
    } else {
      return false;
    }
  }

  isIssueItemsEmpty(){
    if(this.issueItems[0]){
      return true;
    } else {
      return false;
    }
  }

  removeSprintItem(projectID, sprintID, issueNumber){
    if(confirm("Are you sure to remove this sprint item? ")) {
      
      this.sprintService.removeSprintItem(projectID, sprintID, issueNumber).subscribe(
        res => {
          for( var i=0; i < this.issueItems.length; i++) {
            if(issueNumber == this.issueItems[i].number){
              this.issueItems.splice(i, 1);
            }
          }
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
  }

}



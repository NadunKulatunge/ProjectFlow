import { Component, OnInit } from '@angular/core';
import { SprintService } from '../shared/sprint.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';

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

  constructor(private githubService: GithubService, private sprintService: SprintService, private _Activatedroute:ActivatedRoute, private router : Router) { }

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
        if (err.status === 404 || err.status === 403.2 ) {
          this.router.navigateByUrl('/projects');
        }
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
    console.log(this.issueItems)
    if(this.issueItems[0]){
      return true;
    } else {
      return false;
    }
  }

}



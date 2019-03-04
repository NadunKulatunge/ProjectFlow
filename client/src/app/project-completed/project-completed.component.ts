import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';

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

    this.githubService.getGithubClosedIssues(this.pid).subscribe(
      res => {
        //this.userDetails = res['user'];
        //console.log(res);
        this.githubClosedIssues = res;
        this.githubClosedIssues = this.githubClosedIssues.items
        console.log(this.githubClosedIssues)
      },
      err => { 
        console.log(err);
        
      }
    );


  }

}

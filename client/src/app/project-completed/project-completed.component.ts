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

  id;
  project;
  projectID;
  githubClosedIssues;

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.params['id'];

    this.githubService.getGithubClosedIssues(this.id).subscribe(
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

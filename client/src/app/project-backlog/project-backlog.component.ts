import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';

@Component({
  selector: 'app-project-backlog',
  templateUrl: './project-backlog.component.html',
  styleUrls: ['./project-backlog.component.css']
})
export class ProjectBacklogComponent implements OnInit {

  id;
  project;
  projectID;
  githubOpenIssues;

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.params['id'];

    this.githubService.getGithubOpenIssues(this.id).subscribe(
      res => {
        //this.userDetails = res['user'];
        //console.log(res);
        this.githubOpenIssues = res;
        this.githubOpenIssues = this.githubOpenIssues.items
        console.log(this.githubOpenIssues)
      },
      err => { 
        console.log(err);
        
      }
    );


  }

}

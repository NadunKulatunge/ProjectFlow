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

  id;
  project;
  projectID;
  githubOpenIssues;

  constructor(private githubService: GithubService, private _Activatedroute:ActivatedRoute, private dataService: DataService, private router : Router) { }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.params['id'];

    this.dataService.getProjectInfo(this.id).subscribe(
      res => {
        this.project = res;
        //console.log(res);
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 ) {
          this.router.navigateByUrl('/projects');
        }
        console.log(err);
        
      }
    );

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

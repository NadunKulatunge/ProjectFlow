import { Component, OnInit } from '@angular/core';
import { GithubService } from '../shared/github.service';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.css']
})
export class GithubComponent implements OnInit {

  githubUserProfile;
  githubOpenIssues;
  userName;

  constructor(private githubService: GithubService, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.githubService.getGithubUserProfile().subscribe(
      res => {
        //this.userDetails = res['user'];
        //console.log(res);
        this.githubUserProfile = res;
        //console.log(res)
        this.userName = this.githubUserProfile['login'];
        //console.log(this.userName)
      },
      err => { 
        console.log(err);
        
      }
    );

    /*this.githubService.getGithubOpenIssues(this.id).subscribe(
      res => {
        //this.userDetails = res['user'];
        //console.log(res);
        this.githubOpenIssues = res;
        this.githubOpenIssues = this.githubOpenIssues.items
        console.log(this.githubOpenIssues[0])
      },
      err => { 
        console.log(err);
        
      }
    );*/

  }

}

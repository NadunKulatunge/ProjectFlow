import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import { GithubService } from '../shared/github.service';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userDetails;
  githubDetails;

  serverSuccessMessage;
  showSucessMessage;
  serverErrorMessages;
  constructor(private userService: UserService,private githubService: GithubService,  private router: Router) { }

  ngOnInit() {

    this.githubService.getGithubUserProfile().subscribe(
      res => {
        this.githubDetails = res;
        console.log(res);
      },
      err => { 
        console.log(err);
        
      }
    );

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => { 
        console.log(err);
        
      }
    );
  }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  viewGithub(){
    this.router.navigate(['/github']);
  }

  githubLogout(){
    if(confirm("Are you sure to disconnect from Github? ")) {
      
      this.githubService.githubLogout().subscribe(
        res => {
          this.showSucessMessage = true;
          setTimeout(() => this.onLogout(), 4000);
          this.serverSuccessMessage = "Successfully disconnected from Github. Please re-login.";
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

  githubClientLogin(){
    window.location.href = 'https://github.com/login/oauth/authorize?client_id='+environment.auth_client+'&scope=repo' ;
  }

}

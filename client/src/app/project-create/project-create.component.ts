import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/project.model';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  userDetails;
  userID;
  githubPartURL;
  urlsplit;
  url;

  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private dataService: DataService, private router : Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userID = this.userDetails._id;
        console.log(res);
      },
      err => { 
        console.log(err);
        
      }
    );
  }


  onSubmit(form: NgForm) {
    this.url = form.value.githubURL;
    this.urlsplit = this.url.split("/").slice(-2)
    this.githubPartURL = this.urlsplit[0]+"/"+this.urlsplit[1];
  
    let newItem: Project = {
      title: form.value.title,
      githubURL: form.value.githubURL,
      githubPartURL: this.githubPartURL,
      description: form.value.description,
      userID: this.userID

    }
    console.log(newItem);

    this.dataService.createProject(newItem).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
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

  resetForm(form: NgForm) {
    this.dataService.selectedProject = {
      title: '',
      githubURL: '',
      githubPartURL: '',
      description: '',
      userID: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
  

}

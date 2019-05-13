import { Component, OnInit } from '@angular/core';
import { Sprint } from '../shared/sprint.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { UserService } from '../shared/user.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';

@Component({
  selector: 'app-project-create-sprint',
  templateUrl: './project-create-sprint.component.html',
  styleUrls: ['./project-create-sprint.component.css']
})
export class ProjectCreateSprintComponent implements OnInit {

  pid;
  project;
  projectTitle;
  projectID;

  todaydate= new Date();

  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private _location: Location, private projectService: ProjectService, private sprintService: SprintService, private router : Router, private userService: UserService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.getProjectInfo(this.pid); //Parameter Protection
    
  }

  //// HTTP Methods

  //Get the Info related to the Project & Parameter Protection
  getProjectInfo(projectID){
    this.projectService.getProjectInfo(projectID).subscribe(
      res => {
        this.project = res;
        this.project = this.project.project;
        this.projectTitle = this.project.title;
        this.projectID = this.project._id;
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 || err.status === 403) {
          this.router.navigate(['/404']);
        }
        console.log(err);
        
      }
    );
  }

  onSubmit(form: NgForm) {
  
    let newItem: Sprint = {
      title: form.value.title,
      startDate: form.value.startDate,
      endDate: form.value.endDate,
      projectID: this.projectID,

    }
    console.log(newItem);

    this.sprintService.createSprint(newItem).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => {this.showSucessMessage = false;}, 4000);
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
    this.sprintService.selectedSprint = {
      title: '',
      startDate: '',
      endDate: '',
      projectID: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  goBack(){
    this._location.back();
  }

  
}

import { Component, OnInit } from '@angular/core';
import { Sprint } from '../shared/sprint.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';

import { UserService } from '../shared/user.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';

import * as moment from 'moment';

@Component({
  selector: 'app-project-edit-sprint',
  templateUrl: './project-edit-sprint.component.html',
  styleUrls: ['./project-edit-sprint.component.css']
})
export class ProjectEditSprintComponent implements OnInit {

  pid;
  sid;
  project;
  projectTitle;
  projectID;
  sprint;

  todaydate= new Date();

  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(
    private _location: Location, 
    private projectService: ProjectService, 
    private sprintService: SprintService, 
    private router : Router, 
    private userService: UserService, 
    private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    //Get URL parameters
    this.pid=this._Activatedroute.snapshot.params['pid'];

    this.sid=this._Activatedroute.snapshot.params['sid'];

    this.getProjectInfo(this.pid); //Parameter Protection
    this.getSprintInfo(this.pid, this.sid); //Parameter Protection
    
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

  getSprintInfo(projectID, sprintID){
    this.sprintService.getSprint(projectID,sprintID).subscribe(
      res => {
        this.sprint = res;
        this.sprint = this.sprint.result;
        this.sprintService.selectedSprint.title = this.sprint[0].title;
        this.sprintService.selectedSprint.startDate = moment(this.sprint[0].startDate).format("YYYY-MM-DD");
        this.sprintService.selectedSprint.endDate = moment(this.sprint[0].endDate).format("YYYY-MM-DD");

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

    this.sprintService.editSprint(newItem, this.pid, this.sid).subscribe(
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

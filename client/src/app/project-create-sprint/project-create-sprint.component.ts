import { Component, OnInit } from '@angular/core';
import { Sprint } from '../shared/sprint.model';
import { DataService } from '../shared/data.service';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-create-sprint',
  templateUrl: './project-create-sprint.component.html',
  styleUrls: ['./project-create-sprint.component.css']
})
export class ProjectCreateSprintComponent implements OnInit {

  id;
  project;
  projectTitle;
  projectID;

  showSucessMessage: boolean;
  serverErrorMessages: string;
  constructor(private dataService: DataService, private router : Router, private userService: UserService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit() {
    this.id=this._Activatedroute.snapshot.params['id'];

    this.dataService.getProjectInfo(this.id).subscribe(
      res => {
        this.project = res;
        this.projectTitle = this.project.project.title;
        this.projectID = this.project.project._id;
        //console.log(this.projectID);
      },
      err => { 
        if (err.status === 404 || err.status === 403.2 ) {
          this.router.navigateByUrl('/projects');
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

    this.dataService.createSprint(newItem).subscribe(
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
    this.dataService.selectedSprint = {
      title: '',
      startDate: '',
      endDate: '',
      projectID: '',
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }

  
}

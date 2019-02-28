import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects;
  projectList;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getProjects().subscribe(
      res => {
        this.projects = res;
        this.projectList = this.projects.result;
        console.log(res);
      },
      err => { 
        console.log(err);
        
      }
    );
  }

}

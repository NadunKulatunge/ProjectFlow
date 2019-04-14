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
  response;

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

  deleteItem(projectID) {
    if(confirm("Are you sure to remove this project? ")) {
      this.dataService.removeProject(projectID).subscribe(
        res => {
          this.response = res;
          if(this.response.success){
            //Remove project item from the list
            for( var i=0; i < this.projectList.length; i++) {
              if(projectID == this.projectList[i]._id){
                this.projectList.splice(i, 1);
              }
            }
          }
        },
        err => { 
          console.log(err);
          
        }
      );
    }
  }

}

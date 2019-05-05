import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, throwError } from 'rxjs';

import { ProjectsComponent } from './projects.component';
import { ProjectService } from '../shared/project.service';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let comp: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ ProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    projectService = new ProjectService(null);
    comp = new ProjectsComponent(projectService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get users project lists from projectService', () => {

    spyOn(projectService, 'getProjects').and.callFake(() => {
      return from([ 
        {
          status: true,
          result: {
            projects: 'ProjectLists',
          }
        }  
      ]);
    });

    comp.ngOnInit()

    expect(comp.projectList).toEqual({ projects: 'ProjectLists' });
  });
});

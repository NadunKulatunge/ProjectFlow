import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectCreateSprintComponent } from './project-create-sprint.component';

import { SprintService } from '../shared/sprint.service';
import { ProjectService } from '../shared/project.service';

describe('ProjectCreateSprintComponent', () => {
  let component: ProjectCreateSprintComponent;
  let comp: ProjectCreateSprintComponent;

  let sprintService: SprintService;
  let projectService: ProjectService;

  let fixture: ComponentFixture<ProjectCreateSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ ProjectCreateSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    projectService = new ProjectService(null);
    sprintService = new SprintService(null);

    comp = new ProjectCreateSprintComponent(null, projectService, sprintService, null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set project property with the items returned from the server', () => {
    spyOn(projectService, 'getProjectInfo').and.callFake((x) => {
      return from([ 
        {
          status: true,
          project: {
            _id: x,
            title: 'test'
          }
        } 
      ]);
    });

    comp.getProjectInfo(123);

    expect(comp.project).toEqual({ _id: 123, title: 'test' });
    expect(comp.projectTitle).toBe('test');
    expect(comp.projectID).toBe(123);
  });

});

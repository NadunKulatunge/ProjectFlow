import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { ProjectCreateSprintComponent } from './project-create-sprint.component';

import { SprintService } from '../shared/sprint.service';
import { ProjectService } from '../shared/project.service';
import { UserService } from '../shared/user.service';

describe('ProjectCreateSprintComponent', () => {
  let component: ProjectCreateSprintComponent;
  let comp: ProjectCreateSprintComponent;

  let sprintService: SprintService;
  let projectService: ProjectService;
  let userService: UserService;

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
    userService = new UserService(null);

    comp = new ProjectCreateSprintComponent(null, projectService, sprintService, null, userService, null);
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

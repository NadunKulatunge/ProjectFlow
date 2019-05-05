import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';

import { ProjectCompletedComponent } from './project-completed.component';

import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';

import { ReadMoreComponent } from '../read-more/read-more.component';

describe('ProjectCompletedComponent', () => {
  let component: ProjectCompletedComponent;
  let comp: ProjectCompletedComponent;
  let fixture: ComponentFixture<ProjectCompletedComponent>;

  let githubService: GithubService;
  let projectService: ProjectService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ 
        ProjectCompletedComponent,
        ReadMoreComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    githubService = new GithubService(null);
    projectService = new ProjectService(null);

    comp = new ProjectCompletedComponent(githubService, null, projectService, null);
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
          }
        } 
      ]);
    });

    comp.getProjectInfo(123);

    expect(comp.project).toEqual({ _id: 123 });
    expect(comp.projectID).toBe(123)
  });

  it('should set project property with the closedissues returned from the githubAPI', () => {
    spyOn(githubService, 'getGithubClosedIssues').and.callFake((x) => {
      return from([ 
        {
          status: true,
          items: {
            _id: x,
          }
        } 
      ]);
    });

    comp.getGithubClosedIssues(123);

    expect(comp.githubClosedIssues).toEqual({ _id: 123 });
  });

});

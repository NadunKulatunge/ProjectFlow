import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, throwError } from 'rxjs';

import { ProjectProfileComponent } from './project-profile.component';

import { ProjectService } from '../shared/project.service';
import { GithubService } from '../shared/github.service';
import { SprintService } from '../shared/sprint.service';
import { StyleCompiler } from '@angular/compiler';

describe('ProjectProfileComponent', () => {
  let component: ProjectProfileComponent;
  let comp: ProjectProfileComponent;
  let fixture: ComponentFixture<ProjectProfileComponent>;

  let projectService: ProjectService;
  let githubService: GithubService;
  let sprintService: SprintService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ ProjectProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    projectService = new ProjectService(null);
    githubService = new GithubService(null);
    sprintService = new SprintService(null);
    
    comp = new ProjectProfileComponent(githubService, projectService, sprintService, null, null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get project information from ProjectService', () => {

    spyOn(projectService, 'getProjectInfo').and.callFake(() => {
      return from([ 
        {
          status: true,
          project: {
            title: "Projec Title",
            githubURL: "https://github.com/angular/angular-cli",
            description: 'Project Description',
          }
        }  
      ]);
    });

    comp.getProjectInformation(123)

    expect(comp.title).toEqual('Projec Title');
    expect(comp.githubURL).toEqual('https://github.com/angular/angular-cli');
    expect(comp.description).toEqual('Project Description');
  });

  it('should get project open Issue count from GithubService', () => {

    spyOn(githubService, 'getGithubIssueCount').and.callFake(() => {
      return from([ 
        {
          total_count: 12 
        }  
      ]);
    });

    comp.getGithubOpenIssueCount(123)

    expect(comp.openIssueCount).toEqual(12);
  });

  it('should get project closed Issue count from GithubService', () => {

    spyOn(githubService, 'getGithubIssueCount').and.callFake(() => {
      return from([ 
        {
          total_count: 19 
        }  
      ]);
    });

    comp.getGithubClosedIssueCount(123)

    expect(comp.closedIssueCount).toEqual(19);
  });

  it('should get project open Pull-Request count from GithubService', () => {

    spyOn(githubService, 'getGithubIssueCount').and.callFake(() => {
      return from([ 
        {
          total_count: 12 
        }  
      ]);
    });

    comp.getGithubOpenPullRequestCount(123)

    expect(comp.openPullRequestCount).toEqual(12);
  });

  it('should get project closed Pull-Request count from GithubService', () => {

    spyOn(githubService, 'getGithubIssueCount').and.callFake(() => {
      return from([ 
        {
          total_count: 19 
        }  
      ]);
    });

    comp.getGithubClosedPullRequestCount(123)

    expect(comp.closedPullRequestCount).toEqual(19);
  });


  it('should get sprints and sprint info from SprintService', () => {

    spyOn(sprintService, 'getSprints').and.callFake(() => {
      return from([ 
        {
          status: true,
          result: [{
            0: {title: "Projec Title"},
            1: {title: "Projec Title"}
          }]
        }    
      ]);
    });

    spyOn(githubService, 'getGithubSprintDetails').and.callFake(() => {
      return from([ 
        {
          0: {openIssues: 2, closedIssues: 1}
        }  
      ]);
    });

    comp.getSprints(123)

    expect(comp.sprintOpenIssues).toEqual([2]);
    expect(comp.sprintClosedIssues).toEqual([1]);
    expect(comp.sprintClosedIssuePercentages).toEqual(["33.3"]);
  });

  it('should test the NaN validate function', () => {

    expect(comp.NaNValidate(NaN)).toEqual(0);
    expect(comp.NaNValidate(2)).toEqual(2);
  });

  it('should check if loaded', () => {

    comp.count=1;
    expect(comp.isLoading()).toBeTruthy();

    comp.count=6;
    expect(comp.isLoading()).toBeFalsy();
  });
});
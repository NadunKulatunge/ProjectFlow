import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { Observable, from, throwError } from 'rxjs';

import { ProjectBacklogComponent } from './project-backlog.component';

import { UserService } from '../shared/user.service';
import { GithubService } from '../shared/github.service';
import { ProjectService } from '../shared/project.service';
import { SprintService } from '../shared/sprint.service';

import { ReadMoreComponent } from '../read-more/read-more.component';

describe('ProjectBacklogComponent', () => {
  let component: ProjectBacklogComponent;
  let comp: ProjectBacklogComponent;
  let fixture: ComponentFixture<ProjectBacklogComponent>;

  let userService: UserService;
  let githubService: GithubService;
  let projectService: ProjectService;
  let sprintService: SprintService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ 
        ProjectBacklogComponent,
        ReadMoreComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBacklogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = new UserService(null);
    githubService = new GithubService(null);
    projectService = new ProjectService(null);
    sprintService = new SprintService(null);

    comp = new ProjectBacklogComponent(githubService, projectService, sprintService,  null, null, null);

    comp.issuesNumberToSprintTitle = new Map();
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

  xit('should navigate to 404 if project not found error from the server', () => {
    spyOn(projectService, 'getProjectInfo').and.callFake(() => {
      return throwError( {status: 404} )
    });

    comp.getProjectInfo(123);
  });

  it('should set githubOpenIssues property with the items returned from the server', () => {
    spyOn(githubService, 'getGithubOpenIssues').and.callFake((x) => {
      return from([ 
        {
          status: true,
          items: {
            _id: x,
          }
        } 
      ]);
    });

    comp.getGithubOpenIssues(123);

    expect(comp.githubOpenIssues).toEqual({ _id: 123 });
  });

  it('should set sprints property with the items returned from the server', () => {
    spyOn(sprintService, 'getSprints').and.callFake((x) => {
      return from([ 
        {
          status: true,
          result: {
            _id: x,
          }
        } 
      ]);
    });

    comp.getSprints(123);

    expect(comp.sprints).toEqual({ _id: 123 });
  });

  it('should set issues added to sprints', () => {
    spyOn(sprintService, 'getIssuesAddedToSprints').and.callFake((x) => {
      return from([ 
        {
          status: true,
          result: [
            {
              _id: 123,
              issueNumber: 3,
              sprintTitle: 'Sprint 1'
            },
            {
              _id: 124,
              issueNumber: 5,
              sprintTitle: 'Sprint 2'
            }
          ]
        } 
      ]);
    });

    comp.getIssuesAddedToSprints(123);

    expect(comp.data).toEqual([
      {
        _id: 123,
        issueNumber: 3,
        sprintTitle: 'Sprint 1'
      },
      {
        _id: 124,
        issueNumber: 5,
        sprintTitle: 'Sprint 2'
      }
    ]);
    expect(comp.issuesAddedToSprints).toEqual([3, 5]);
    expect(comp.issuesNumberToSprintTitle).toEqual(new Map([[3 ,"Sprint 1"],[5, "Sprint 2"]]));
  });

  it('should set sprints property with the items returned from the server', () => {
    comp.projectID = 123;

    let y = spyOn(comp, 'addIssueToSprintArray');
    
    spyOn(sprintService, 'createSprintItem').and.callFake((x, y, z) => {
      return from([ 
        {
          _id: y,
          issueNumber: x,
          sprintTitle: z,
          projectID: comp.projectID
        } 
      ]);
    });

    comp.addToSprint(3, 12, 'Sprint 1');

    expect(y).toHaveBeenCalled();
  });

  it('should check if the issue has been added to sprint using isAddedToSprint(issueNumber) method', () => {
    comp.issuesAddedToSprints = [3, 5];

    let ans = comp.isAddedToSprint(3)

    expect(ans).toBe(true);
  });

  it('should add issue to issuesAddedToSprintArray using addIssueToSprintArray() method', () => {
    comp.issuesAddedToSprints = [3, 5];

    comp.addIssueToSprintArray(6)

    expect(comp.issuesAddedToSprints).toContain(6);
  });

  it('should get SprintItem title from the issue number using getSprintItemSprintTitle() method', () => {
    comp.issuesNumberToSprintTitle = new Map([[3 ,"Sprint 1"],[5, "Sprint 2"]]);

    let title1 = comp.getSprintItemSprintTitle(3);
    let title2 = comp.getSprintItemSprintTitle(5);

    expect(title1).toBe("Sprint 1");
    expect(title2).toBe("Sprint 2");
  });

  

});

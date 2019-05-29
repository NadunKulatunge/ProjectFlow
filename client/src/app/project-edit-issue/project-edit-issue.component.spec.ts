import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditIssueComponent } from './project-edit-issue.component';

describe('ProjectEditIssueComponent', () => {
  let component: ProjectEditIssueComponent;
  let fixture: ComponentFixture<ProjectEditIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});

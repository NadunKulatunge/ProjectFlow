import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateIssueComponent } from './project-create-issue.component';

describe('ProjectCreateIssueComponent', () => {
  let component: ProjectCreateIssueComponent;
  let fixture: ComponentFixture<ProjectCreateIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCreateIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

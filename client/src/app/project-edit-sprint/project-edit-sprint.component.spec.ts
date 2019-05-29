import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectEditSprintComponent } from './project-edit-sprint.component';

describe('ProjectEditSprintComponent', () => {
  let component: ProjectEditSprintComponent;
  let fixture: ComponentFixture<ProjectEditSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectEditSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectEditSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});

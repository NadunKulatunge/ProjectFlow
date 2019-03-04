import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCreateSprintComponent } from './project-create-sprint.component';

describe('ProjectCreateSprintComponent', () => {
  let component: ProjectCreateSprintComponent;
  let fixture: ComponentFixture<ProjectCreateSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCreateSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

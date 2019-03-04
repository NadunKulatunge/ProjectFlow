import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSprintComponent } from './project-sprint.component';

describe('ProjectSprintComponent', () => {
  let component: ProjectSprintComponent;
  let fixture: ComponentFixture<ProjectSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

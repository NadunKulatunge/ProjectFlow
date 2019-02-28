import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCompletedComponent } from './project-completed.component';

describe('ProjectCompletedComponent', () => {
  let component: ProjectCompletedComponent;
  let fixture: ComponentFixture<ProjectCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

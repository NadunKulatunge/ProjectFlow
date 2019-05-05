import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProjectSprintComponent } from './project-sprint.component';
import { ReadMoreComponent } from '../read-more/read-more.component';

describe('ProjectSprintComponent', () => {
  let component: ProjectSprintComponent;
  let fixture: ComponentFixture<ProjectSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule, 
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ 
        ProjectSprintComponent,
        ReadMoreComponent
       ]
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

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By, BrowserModule } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Observable, from, throwError } from 'rxjs';

import { ProjectCreateComponent } from './project-create.component';

import { ProjectService } from '../shared/project.service';
import { UserService } from '../shared/user.service';

describe('ProjectCreateComponent', () => {
  let component: ProjectCreateComponent;
  let comp: ProjectCreateComponent;
  let projectService: ProjectService;
  let userService: UserService;

  let fixture: ComponentFixture<ProjectCreateComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ 
        ProjectCreateComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCreateComponent);
    component = fixture.componentInstance;
    projectService = new ProjectService(null);
    userService = new UserService(null);

    comp = new ProjectCreateComponent(null, projectService, null, userService);

    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the part URL from submitted form', () => {
    const testForm = <NgForm>{
      value: {
        title: "Hello",
        githubURL: "https://github.com/angular/angular-cli",
        description: 'Test',
        userID: 123
      }
    };

    component.onSubmit(testForm);

    expect(component.githubPartURL).toEqual('angular/angular-cli');
  });

  it('should set user property with the items returned from the server', () => {
    spyOn(userService, 'getUserProfile').and.callFake(() => {
      return from([ 
        {
          status: true,
          user: {
            _id: 123,
          }
        } 
      ]);
    });

    comp.ngOnInit();

    expect(comp.userID).toEqual(123);
  });

});

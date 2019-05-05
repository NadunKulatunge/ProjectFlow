import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, throwError } from 'rxjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { SignInComponent } from './sign-in.component';

import { UserService } from '../../shared/user.service';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let comp: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let router: Router;

  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [ 
        SignInComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = new UserService(null);
    comp = new SignInComponent(userService,  router);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check loggedIn and redirect the user to Projects page if loggedIn', () => {

    spyOn(userService, 'isLoggedIn').and.callFake(() => { 
        return true; //user is logged in
    })
    let spy = spyOn(router, 'navigateByUrl'); //called to navigate

    comp.ngOnInit()

    expect(spy).toHaveBeenCalledWith('/projects');
  });

  it('should redirect users to the projects page if users login details are correct', () => {
    const testForm = <NgForm>{
      value: {
        email: "test@email.com",
        password: "1234"
      }
    };

    spyOn(userService, 'login').and.callFake((x) => {
      return from([ 
        {
          token: '123',
        } 
      ]);
    });

    let spyResponse = spyOn(userService, 'setToken');
    let spyNavigate = spyOn(router, 'navigateByUrl'); //called to navigate

    comp.onSubmit(testForm);

    expect(spyResponse).toHaveBeenCalledWith('123');
    expect(spyNavigate).toHaveBeenCalledWith('/projects');
  });

});


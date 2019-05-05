import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, from, throwError } from 'rxjs';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { SignUpComponent } from './sign-up.component';

import { UserService } from '../../shared/user.service';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let comp: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
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
        SignUpComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    router = TestBed.get(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();

    userService = new UserService(null);
    comp = new SignUpComponent(userService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit signup details succesfully', () => {
    comp.serverErrorMessages = "Some fake errors!"

    const testForm = <NgForm>{
      value: {
        fullName: "Nadun Kulatunge",
        email: "test@email.com",
        password: "1234"
      }
    };

    spyOn(userService, 'postUser').and.callFake((x) => {
      return from([ 
        {
          token: '123',
        } 
      ]);
    });

    let spyResetForm = spyOn(comp, 'resetForm');

    comp.onSubmit(testForm);

    expect(comp.showSucessMessage).toBeTruthy();
    expect(spyResetForm).toHaveBeenCalled();
  });


});
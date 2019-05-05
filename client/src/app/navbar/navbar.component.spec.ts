import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkWithHref } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { AppComponent } from '../app.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]) 
      ],
      declarations: [ 
        AppComponent, 
        NavbarComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a link to projects page', () => {
    let debugElements = fixture.debugElement.queryAll(By.directive(RouterLinkWithHref));

    let index = debugElements.findIndex(de => de.properties['href'] === '/projects');

    expect(index).toBeGreaterThan(-1);
  });

  //Navigation Testing
  it('should redirect the user to the login page onLogout()', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.onLogout();

    expect(spy).toHaveBeenCalledWith(['/login']);
  });

  it('should redirect the user to the login page onLogin()', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.onLogin();

    expect(spy).toHaveBeenCalledWith(['/login']);
  });
  
  
});

import { NavbarComponent } from './navbar.component';
import { UserService } from '../shared/user.service';
import { Observable, from } from 'rxjs';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let userService: UserService;

    beforeEach(() => {
        userService = new UserService(null);
        component = new NavbarComponent(userService, null);
    });

    //Function calls and Attributes
    it('should open the navbar when navbar toggled when navbar is closed', () => {
        component.navbarOpen = false;

        component.toggleNavbar();

        expect(component.navbarOpen).toBeTruthy();
    });
    it('should close the navbar when navbar toggled when navbar is open', () => {
        component.navbarOpen = true;

        component.toggleNavbar();

        expect(component.navbarOpen).toBeFalsy();
    });

    //Spies on Services
    it('should return true if user is loggedin', () => {
        let loginStatus = true;

        spyOn(userService, 'isLoggedIn').and.callFake(() => {
            return loginStatus;
        })

        let loggedInStatus = component.isLoggedIn();

        expect(loggedInStatus).toBe(loginStatus);
    });

    it('should return false if user is not loggedin', () => {
        let loginStatus = false;

        spyOn(userService, 'isLoggedIn').and.callFake(() => {
            return loginStatus;
        })

        let loggedInStatus = component.isLoggedIn();

        expect(loggedInStatus).toBe(loginStatus);
    });

})
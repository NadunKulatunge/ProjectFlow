import { appRoutes } from './routes';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';

describe('routes', () => {

    it('should contain a route for /signup', () => {
        expect(appRoutes).toContain({
            path: 'signup', component: UserComponent,
            children: [{ path: '', component: SignUpComponent }]
        })
    });

    it('should contain a route for /login', () => {
        expect(appRoutes).toContain({
            path: 'login', component: UserComponent,
            children: [{ path: '', component: SignInComponent }]
        })
    });
})
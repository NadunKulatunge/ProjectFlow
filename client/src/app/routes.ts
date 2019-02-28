import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GithubComponent } from './github/github.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'github', component: GithubComponent,canActivate:[AuthGuard]
    },
    {
        path: 'projects', component: ProjectsComponent,canActivate:[AuthGuard]
    },
    {
        path: 'projectcreate', component: ProjectCreateComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-profile/:id', component: ProjectProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];
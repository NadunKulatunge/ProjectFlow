import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { ProjectBacklogComponent } from './project-backlog/project-backlog.component';
import { ProjectCompletedComponent } from './project-completed/project-completed.component';
import { ProjectCreateSprintComponent } from './project-create-sprint/project-create-sprint.component';
import { ProjectEditSprintComponent } from './project-edit-sprint/project-edit-sprint.component';
import { ProjectCreateIssueComponent } from './project-create-issue/project-create-issue.component';
import { ProjectEditIssueComponent } from './project-edit-issue/project-edit-issue.component';
import { ProjectSprintComponent } from './project-sprint/project-sprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FaqComponent } from './faq/faq.component';

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
        path: 'projects', component: ProjectsComponent,canActivate:[AuthGuard]
    },
    {
        path: 'faq', component: FaqComponent
    },
    {
        path: 'projectcreate', component: ProjectCreateComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-edit/:pid', component: ProjectEditComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-profile/:pid', component: ProjectProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-backlog/:pid', component: ProjectBacklogComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-completed/:pid', component: ProjectCompletedComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-create-sprint/:pid', component: ProjectCreateSprintComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-edit-sprint/:pid/:sid', component: ProjectEditSprintComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-create-issue/:pid', component: ProjectCreateIssueComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-edit-issue/:pid/:iid', component: ProjectEditIssueComponent,canActivate:[AuthGuard]
    },
    {
        path: 'project-sprint/:pid/:sid', component: ProjectSprintComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    },
    {
        path: '404', component: NotFoundComponent
    },
    {
        path: '**', redirectTo: '/404'
    }
];
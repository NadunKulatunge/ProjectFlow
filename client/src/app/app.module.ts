// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { GithubService } from './shared/github.service';
import { ProjectsComponent } from './projects/projects.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ProjectProfileComponent } from './project-profile/project-profile.component';
import { ProjectBacklogComponent } from './project-backlog/project-backlog.component';
import { ProjectCompletedComponent } from './project-completed/project-completed.component';
import { ProjectCreateSprintComponent } from './project-create-sprint/project-create-sprint.component';
import { ProjectSprintComponent } from './project-sprint/project-sprint.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { ProjectCreateIssueComponent } from './project-create-issue/project-create-issue.component';
import { FaqComponent } from './faq/faq.component';
import { ProjectEditComponent } from './project-edit/project-edit.component';
import { ProjectEditIssueComponent } from './project-edit-issue/project-edit-issue.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    ProjectsComponent,
    NavbarComponent,
    ProjectCreateComponent,
    ProjectProfileComponent,
    ProjectBacklogComponent,
    ProjectCompletedComponent,
    ProjectCreateSprintComponent,
    ProjectSprintComponent,
    NotFoundComponent,
    ReadMoreComponent,
    ProjectCreateIssueComponent,
    FaqComponent,
    ProjectEditComponent,
    ProjectEditIssueComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
    },
    AuthGuard,UserService, GithubService],
  bootstrap: [AppComponent]
})
export class AppModule { }

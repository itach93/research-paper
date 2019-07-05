import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ContentComponent } from './content/content.component';
import { SubmissionComponent } from './submission/submission.component';
import { AuthGuard } from './_guards/auth.guard';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { PaperAreaResolver } from './_resolvers/paper-area.resolver';

const routes: Routes = [
  // { path: '', redirectTo: 'ContentComponent', pathMatch: 'full' },
  { path: 'home', component: ContentComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'submit', component: SubmissionComponent, canActivate: [AuthGuard], resolve:
    {
      user: UserDetailResolver,
      area: PaperAreaResolver
    }
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'captcha', component: CaptchaComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' }
];

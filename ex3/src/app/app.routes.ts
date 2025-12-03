import { Routes } from '@angular/router';
import { CvComponent } from './components/cv/cv.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ImagesComponent } from './components/images/images.component';
import { DetailCvComponent } from './components/detail-cv/detail-cv.component';
import { EmbauchesListComponent } from './components/embauches-list/embauches-list.component';

export const routes: Routes = [
  { path: 'cv', component: CvComponent },
  { path: 'auth', component: AuthFormComponent },
  { path: 'img', component: ImagesComponent },
  {path: 'embauches', component: EmbauchesListComponent},
  { path: 'cv/:id', component: DetailCvComponent },

  { path: '**', redirectTo: '' },

];

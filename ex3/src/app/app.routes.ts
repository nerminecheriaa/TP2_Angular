import { Routes } from '@angular/router';
import { CvComponent } from './components/cv/cv.component';
import {EmbauchesListComponent } from './components/embauches-list/embauches-list.component';

export const routes: Routes = [
  { path: '', component: CvComponent },
  {path: 'embauches', component: EmbauchesListComponent },
];

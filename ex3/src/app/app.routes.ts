import { Routes } from '@angular/router';
import { CvComponent } from './components/cv/cv.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ImagesComponent } from './components/images/images.component';
import { EmbauchesListComponent } from './components/embauches-list/embauches-list.component';
import {CarouselComponent} from './components/carousel/carousel.component';

export const routes: Routes = [
  { path: '', component: CvComponent },
  { path: 'auth', component: AuthFormComponent },
  { path: 'img', component: ImagesComponent },
  {path: 'embauches', component: EmbauchesListComponent},
  { path: 'carousel', component: CarouselComponent },

  { path: '**', redirectTo: '' },

];

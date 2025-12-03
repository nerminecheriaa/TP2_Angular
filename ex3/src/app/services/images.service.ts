import { Injectable } from '@angular/core';
import { interval, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private images = [
    'profile1.png',
    'profile2.png',
    'profile3.png'
  ];

  getImageStream(vitesse: number): Observable<string> {
    return interval(vitesse).pipe(
      map(i => this.images[i % this.images.length])
    );
  }
}

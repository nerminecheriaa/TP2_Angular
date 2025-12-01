import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,

  imports: [CommonModule],
  selector: 'app-images',

  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  imageObservable: Observable<string>=of('');
    
    listeImages = [ 
      'profile1.png', 
      'profile2.png',
      'profile3.png'];
    currentImage: string='';

    constructor() { }

    ngOnInit(){
      this.imageObservable = new Observable(
        (observer) => {
          let i = 0;
          setInterval(
            () => {
              if (i === this.listeImages.length) {
                i = 0;
              }
              observer.next(this.listeImages[i++]);
            }, 1000);
        }
      );
      this.imageObservable.subscribe( 
        (result) => {
          this.currentImage = result;
        }
      ); 
    }
}
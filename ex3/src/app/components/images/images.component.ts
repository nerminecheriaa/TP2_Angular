import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { interval, map } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-images',
  imports: [CommonModule],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {

  temps = 1000; 
  taille = 150; 

  images = [
    'profile1.png',
    'profile2.png',
    'profile3.png'
  ];

  currentImage = '';

  ngOnInit(): void {

    interval(this.temps).pipe(
      map(i => this.images[i % this.images.length])
    )
    .subscribe(img => this.currentImage = img);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesService } from '../../services/images.service';

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
  currentImage = '';

  private imagesService = inject(ImagesService);  

  ngOnInit(): void {
    this.imagesService.getImageStream(this.temps)
      .subscribe(img => this.currentImage = img);
  }
}

import { Component, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  person = input<Cv | null>(null);
  isRotated = signal(false);

  rotateCard() {
    this.isRotated.set(true);
  }

  resetCard() {
    this.isRotated.set(false);
  }
}
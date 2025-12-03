import { Component, input, signal , computed, inject, Input, Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbaucheService } from '../../services/embauche.service';
import { Cv } from '../../models/cv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cv-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-card.component.html',
  styleUrls: ['./cv-card.component.css']
})
export class CvCardComponent {
  person = input<Cv | null>(null);
  private embaucheService = inject(EmbaucheService);


  //@Input() person: Cv | null = null;
  //@Output() embauchePersonne = new EventEmitter<Cv>();


  isRotated = signal(false);
  private router = inject(Router);


  rotateCard() {
    this.isRotated.set(true);
  }

  resetCard() {
    this.isRotated.set(false);
  }

 // Signal calculé pour vérifier si la personne est déjà embauchée
  isHired = computed(() =>
    this.person() ? this.embaucheService.isHired(this.person()!.id) : false
  );

  embaucher(): void {
    if(this.embaucheService.embaucher(this.person()!)){
    this .router.navigate(['/embauches']);}
  }
  gotoDetails(): void {
    if (this.person) {
      console.log('Navigating to details for:', this.person);
      console.log('ID being used:', this.person()!.id);
      this.router.navigate(['/cv', this.person()!.id]);
    }
  }



}

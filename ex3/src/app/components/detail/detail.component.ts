import { Component, input, signal , computed, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmbaucheService } from '../../services/embauche.service';
import { Cv } from '../../models/cv';
import { Router } from '@angular/router';

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
  private embaucheService = inject(EmbaucheService);
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



}

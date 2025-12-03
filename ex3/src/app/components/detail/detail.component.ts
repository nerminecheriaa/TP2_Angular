import { Component, input, signal , computed, inject } from '@angular/core';
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

  // Vérifie si embauché
  isHired = computed(() => {
    const p = this.person();
    return p ? this.embaucheService.isHired(p.id) : false;
  });

  embaucher(): void {
    const p = this.person();
    if (!p) return;          // 🔥 empêche NullPointer

    if (this.embaucheService.embaucher(p)) {
      this.router.navigate(['/embauches']);
    }
  }

  goToProfile() {
    const p = this.person();
    if (!p) return;          // 🔥 empêche NullPointer

    this.router.navigate(['/cv/profile', p.id]);
  }
}

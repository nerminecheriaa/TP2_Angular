import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CvService } from '../../services/cv.service';
import { Cv } from '../../models/cv';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cv-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-profile.component.html',
  styleUrls: ['./cv-profile.component.css']
})
export class CvProfileComponent implements OnInit {
  private cvService = inject(CvService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  cv: Cv | null = null;

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cvService.getCvById(id).subscribe(cv => {
      this.cv = cv;
    });
  }

  deleteCv() {
    if (!this.cv) return;

    this.cvService.deleteCv(this.cv.id).subscribe({
      next: () => {
        alert('CV supprimé avec succès !'); // optionnel
        this.router.navigate(['/cv']); // renvoie à la liste des CVs
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la suppression du CV.');
      }
    });
  }
}

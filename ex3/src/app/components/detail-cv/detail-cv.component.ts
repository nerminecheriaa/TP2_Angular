import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';
import { CvService } from '../../services/cv.service';
import { EmbaucheService } from '../../services/embauche.service';

@Component({
  selector: 'app-detail-cv',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink is needed for navigation if used in HTML
  templateUrl: './detail-cv.component.html',
  styleUrl: './detail-cv.component.css'
})
export class DetailCvComponent implements OnInit {
  // Using a simpler name (standard convention is camelCase for properties)
  cv: Cv | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cvService: CvService
  ) {}

  private embaucheService = inject(EmbaucheService);

  ngOnInit(): void {
    // 1. Get the ID from the route parameters
    const id = this.route.snapshot.params['id'];

    // 2. Subscribe to the Observable returned by the service
    // This is the FIX for "Property 'id' does not exist on type 'Observable'"
    this.cvService.getCvById(+id).subscribe({
      next: (cvData) => {
        if (cvData) {
          this.cv = cvData;
        } else {
          // Optional: Navigate away if ID doesn't exist
          this.router.navigate(['/cv']);
        }
      },
      error: (err) => {
        console.error('Error fetching CV', err);
        this.router.navigate(['/cv']); // Redirect on error
      }
    });
  }
    embaucher(): void {
    if(this.embaucheService.embaucher(this.cv!)){
    this .router.navigate(['/embauches']);}
  }

  deleteCV(): void {
    if (this.cv) {
      // 3. Optional: Add a confirmation dialog
      const confirmDelete = confirm(`Are you sure you want to delete ${this.cv.firstName} ${this.cv.name}?`);

      if (confirmDelete) {
        // Assuming deleteCv also returns an Observable, you must subscribe!
        this.cvService.deleteCv(this.cv.id).subscribe({
          next: () => {
            console.log('CV deleted successfully');
            this.router.navigate(['/cv']);
          },
          error: (err) => {
            console.error('Error deleting CV', err);
          }
        });
      }
    }
  }
}

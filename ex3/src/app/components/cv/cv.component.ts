import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvService } from '../../services/cv.service';
import { ListeComponent } from '../liste/liste.component';
import { CvCardComponent } from  '../cv-card/cv-card.component'
import { Cv } from '../../models/cv';
@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, ListeComponent, CvCardComponent],//ken DetailComponent
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  private cvService = inject(CvService);

  persons = signal<Cv[]>([]);
  selectedPerson = signal<Cv | null>(null);

  ngOnInit(): void {
    this.cvService.getCvs().subscribe(cvs => {
      this.persons.set(cvs);
    });
  }

  selectPerson(person: Cv): void {
    this.selectedPerson.set(person);
  }
}

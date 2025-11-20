import { Component, OnInit ,ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';
import { ListeComponent } from '../liste/liste.component';
import { DetailComponent } from '../detail/detail.component';

@Component({
  selector: 'app-cv',
  standalone: true,
  imports: [CommonModule, ListeComponent, DetailComponent],
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvComponent implements OnInit {
  persons: Cv[] = [
    new Cv(
      1,
      'Cheriaa',
      'Nermine',
      22,
      '12345678',
      'student',
      'https://i.pravatar.cc/150?img=1',
  
    ),
    new Cv(
      2,
      'mariem',
      'y',
      28,
      '87654321',
      'Developer',
      'https://i.pravatar.cc/150?img=2',
    ),
  ];

  selectedPerson: Cv | null = null; 

  constructor() { }

  ngOnInit(): void {
  }

  selectPerson(person: Cv): void {
    this.selectedPerson = person;
  }
}
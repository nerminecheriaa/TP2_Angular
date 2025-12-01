import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-liste',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './liste.component.html',
  //styleUrls: ['./liste.component.css']
  styleUrls:['../../shared/styles/lists.style.css']

})
export class ListeComponent {
  persons = input.required<Cv[]>();
  personSelected = output<Cv>();

  onPersonSelected(person: Cv): void {
    this.personSelected.emit(person);
  }
}

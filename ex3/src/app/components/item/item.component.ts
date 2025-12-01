import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  person = input.required<Cv>(); 
  itemSelected = output<Cv>(); 

  selectItem(): void {
    this.itemSelected.emit(this.person());
  }
}
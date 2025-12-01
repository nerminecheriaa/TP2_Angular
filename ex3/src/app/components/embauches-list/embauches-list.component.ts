import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmbaucheService } from '../../services/embauche.service';
import { ItemComponent } from '../item/item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-embauches-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ItemComponent],
  templateUrl: './embauches-list.component.html',
  //styleUrls: ['./embauches-list.component.css']
  styleUrls:['../../shared/styles/lists.style.css']
})
export class EmbauchesListComponent {

  private embaucheService = inject(EmbaucheService);

  // expose directement le signal pour la vue
  embauchees = this.embaucheService.getEmbauches();
}

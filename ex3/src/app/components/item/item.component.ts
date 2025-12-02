import { Component, input, output, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../../models/cv';
import { EmbaucheService } from '../../services/embauche.service';
import { Router } from '@angular/router';


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

  //constructor(private embaucheService: EmbaucheService) {}
  private embaucheService = inject(EmbaucheService);
  private router = inject(Router)

  // Signal calculé pour vérifier si la personne est déjà embauchée
  isHired = computed(() =>
    this.embaucheService.isHired(this.person().id)
  );

  embaucher(): void {
    if(this.embaucheService.embaucher(this.person())){
    this .router.navigate(['/embauches']);}
  }
  selectItem(): void {
    this.itemSelected.emit(this.person());
    document.documentElement.scrollTop = 0
  }
}

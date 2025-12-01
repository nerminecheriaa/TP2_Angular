import { Injectable, signal } from '@angular/core';
import { Cv } from '../models/cv';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class EmbaucheService {
  // Signal privé - la source de vérité
  private _embauches = signal<Cv[]>([]);

  constructor(private toaster: ToasterService) {}

  // Récupère le signal en lecture seule
  getEmbauches() {
    return this._embauches.asReadonly();
  }

  embaucher(cv: Cv): boolean {
    const current = this._embauches();

    // Vérifie si déjà embauché
    const dejaEmbauche = current.some(c => c.id === cv.id);

    if (dejaEmbauche) {
      this.toaster.showError(`${cv.name} ${cv.name} est déjà embauché(e) !`);
      return false;
    }

    // Met à jour le signal
    this._embauches.update(list => [...list, cv]);
    this.toaster.showSuccess(`${cv.name} ${cv.name} a été embauché(e) !`);
    return true;
  }

  // Vérification simple
  isHired(cvId: number): boolean {
    return this._embauches().some(cv => cv.id === cvId);
  }
}

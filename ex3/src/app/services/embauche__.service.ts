import { Injectable, signal, computed } from '@angular/core';
import { Cv } from '../models/cv';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class EmbaucheService {
  // Signal privé pour les embauches
  private _embauches = signal<Cv[]>(this.loadFromStorage());

  // Signal public en lecture seule
  embauches = computed(() => this._embauches());

  constructor(private toaster: ToasterService) {}
  //private toaster = new ToasterService();

  private loadFromStorage(): Cv[] {
    try {
      const saved = localStorage.getItem('embauches');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(): void {
    localStorage.setItem('embauches', JSON.stringify(this._embauches()));
  }

  getEmbauches() {
    return this.embauches;
  }

  embaucher(cv: Cv): boolean {
    const currentEmbauches = this._embauches();

    // Vérifie si déjà embauché
    const exists = currentEmbauches.some(c => c.id === cv.id);

    if (exists) {
      this.toaster.showError(`${cv.name} ${cv.name} est déjà embauché(e) !`);
      return false;
    }

    // Met à jour le signal
    this._embauches.update(list => [...list, cv]);
    this.saveToStorage();

    this.toaster.showSuccess(`${cv.name} ${cv.name} a été embauché(e) !`);
    return true;
  }


/**
    embaucher_(cv: Cv): boolean {

    // Met à jour le signal
    if (this._embauches.update(list => [...list, cv])){

      this.toaster.showSuccess(`${cv.name} ${cv.name} a été embauché(e) !`);
      this.saveToStorage();
      return true;
    }
    else{
      this.toaster.showError(`${cv.name} ${cv.name} est déjà embauché(e) !`);
      return false;
    }
  }
*/

  // Vérification simple
  isHired(cvId: number): boolean {
    return this._embauches().some(cv => cv.id === cvId);
  }

  // Retirer une embauche
  removeEmbauche(cvId: number): void {
    this._embauches.update(list => list.filter(cv => cv.id !== cvId));
    this.saveToStorage();
    this.toaster.showInfo('Candidat retiré des embauchés');
  }

  // Pour réinitialiser
  clearEmbauches(): void {
    this._embauches.set([]);
    localStorage.removeItem('embauches');
  }
}

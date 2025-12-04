import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cv } from '../models/cv';
import { FakeCvService } from './fake-cv.service';
import { CV_API_CONFIG } from '../config/cv-config';
import { ToasterService } from './toaster.service';
import { catchError, of, tap } from 'rxjs';
import { CvApiResponse } from '../models/cv-api.model';
import { mapCvApiToCv } from '../helpers/cv-mapper.helper';
import { EmbaucheService } from './embauche.service';
@Injectable({
  providedIn: 'root'
})
export class CvService {
  private readonly apiUrl = CV_API_CONFIG.url;

  cvs = signal<Cv[]>([]); // signal pour stocker les CVs

  private http = inject(HttpClient);
  private fakeCvService = inject(FakeCvService);
  private toaster = inject(ToasterService);
  private embaucheService = inject(EmbaucheService);

  constructor() {
    this.loadCvs();
  }

  loadCvs(): void {
    this.http.get<CvApiResponse[]>(this.apiUrl).pipe(
      tap(apiData => console.log('Données API brutes:', apiData)),
      catchError(err => {
        console.error('Erreur API CVs:', err);
        this.toaster.showError('Problème API. Affichage des Fake CVs', 'Erreur');

        this.fakeCvService.getFakeCvs().subscribe(fakeCvs => {
          this.cvs.set(fakeCvs);
        });

        return of([]); // observable vide pour compléter le pipe
      })
    ).subscribe(apiCvs => {
      if (apiCvs.length) {
        const cvs = apiCvs.map(api => mapCvApiToCv(api)); 
        this.cvs.set(cvs);
        this.toaster.showSuccess('CVs chargés depuis l’API.');
      }
    });
  }

  getCvs() {
    return of(this.cvs());
  }

  getCvById(id: number) {
    const cv = this.cvs().find(c => c.id === id) ?? null;
    return of(cv);
  }

  addCv(cv: Cv) {
    const newCvs = [...this.cvs(), cv];
    this.cvs.set(newCvs);
    this.toaster.showSuccess('CV ajouté localement.');
    return of(cv);
  }

  deleteCv(id: number) {
    const newCvs = this.cvs().filter(cv => cv.id !== id);
    this.embaucheService.removeFromEmbauches(id); //supprimer si cv emabauché
    this.cvs.set(newCvs);
    this.toaster.showSuccess('CV supprimé localement', 'Suppression');
    return of(true); // Observable<boolean> pour compatibilité
  }
}

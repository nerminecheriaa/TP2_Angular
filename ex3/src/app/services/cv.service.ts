import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Cv } from '../models/cv';
import { FakeCvService } from './fake-cv.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private apiUrl = 'https://apilb.tridevs.net/api/personnes';
  private cvsSubject = new BehaviorSubject<Cv[]>([]);
  public cvs$ = this.cvsSubject.asObservable();

  private http = inject(HttpClient);
  private fakeCvService = inject(FakeCvService);

  constructor() {
    this.loadCvs();
  }

  private loadCvs(): void {
    this.http.get<any[]>(this.apiUrl)
      .pipe(
        tap(apiData => {
          console.log(' Données brutes de l API:', apiData);
          console.log('Premier élément:', apiData[0]);
        }),
        map(cvs => this.validateAndFixCvs(cvs)),
        tap(cvs => this.cvsSubject.next(cvs)),
        catchError((error) => {
          console.error(' Erreur API:', error);
          return this.fakeCvService.getFakeCvs();
        })
      )
      .subscribe(cvs => this.cvsSubject.next(cvs));
  }

  private validateAndFixCvs(cvs: any[]): Cv[] {
    return cvs.map(cv => this.ensureCvStructure(cv));
  }

  private ensureCvStructure(data: any): Cv {
    const cv = {
      id: data.id || 0,
      name: data.name || 'Nom non défini',
      firstName: data.firstName || data.firstname || 'Prénom non défini',
      age: data.age || 0,
      cin: data.cin || 'Non spécifié',
      job: data.job || 'Poste non spécifié',
      path: this.getValidImagePath(data.path, data.id || 0),
      skills: data.skills || [],
      email: data.email || '',
      phone: data.phone || '',
      address: data.address || ''
    };

    return cv;
  }

  private getValidImagePath(imagePath: string | undefined, id: number): string {
    if (imagePath?.startsWith('http')) {
      return imagePath;
    }


    return 'profile.png';
  }




  getCvs(): Observable<Cv[]> {
    return this.cvs$;
  }

  getCvById(id: number): Observable<Cv | null> {
    return this.cvs$.pipe(
      map(cvs => cvs.find(cv => cv.id === id) || null)
    );
  }

  deleteCv(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`)
      .pipe(
        tap(success => {
          if (success) {
            const currentCvs = this.cvsSubject.value;
            const updatedCvs = currentCvs.filter(cv => cv.id !== id);
            this.cvsSubject.next(updatedCvs);
          }
        }),
        catchError(() => this.fakeCvService.deleteFakeCv(id))
      );
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Cv } from '../models/cv';
import { FakeCvService } from './fake-cv.service';
import { mapCvApiToCv } from '../helpers/cv-mapper.helper';
import { CV_API_CONFIG } from '../config/cv-config';
import { CvApiResponse } from '../models/cv-api.model';
import { ToasterService } from './toaster.service';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private readonly apiUrl = CV_API_CONFIG.url;
  private readonly cvsSubject = new BehaviorSubject<Cv[]>([]);
  public readonly cvs$ = this.cvsSubject.asObservable();

  private http = inject(HttpClient);
  private fakeCvService = inject(FakeCvService);
  private toaster = inject(ToasterService);

  constructor() {
    this.loadCvs();
  }

  private loadCvs(): void {
    this.http.get<CvApiResponse[]>(this.apiUrl).pipe(
      map(apiList => apiList.map(api => mapCvApiToCv(api))), 
      tap(mappedCvs => this.cvsSubject.next(mappedCvs)),    
      catchError(error => {
        this.toaster.showError('Problème API détecté. FakeCvs affichés.');
        return this.fakeCvService.getFakeCvs();
      })
    ).subscribe(cvs => this.cvsSubject.next(cvs));
  }


  getCvs(): Observable<Cv[]> {
    return this.cvs$;
  }

  getCvById(id: number): Observable<Cv | null> {
    return this.cvs$.pipe(
      map(list => list.find(cv => cv.id === id) ?? null)
    );
  }

  deleteCv(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`).pipe(
      tap(success => {
        if (success) {
          const updated = this.cvsSubject.value.filter(cv => cv.id !== id);
          this.cvsSubject.next(updated);
        }
      }),
      catchError(() => this.fakeCvService.deleteFakeCv(id))
    );
  }


}

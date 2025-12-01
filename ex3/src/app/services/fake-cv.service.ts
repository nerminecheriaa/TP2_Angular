import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Cv } from '../models/cv';
import { FAKE_CVS } from '../shared/data/fake-cv';

@Injectable({
  providedIn: 'root'
})
export class FakeCvService {
  
  getFakeCvs(): Observable<Cv[]> {
    return of(FAKE_CVS).pipe(delay(800));
  }

  getFakeCvById(id: number): Observable<Cv | undefined> {
    const cv = FAKE_CVS.find(c => c.id === id);
    return of(cv).pipe(delay(500));
  }

  deleteFakeCv(id: number): Observable<boolean> {
    const index = FAKE_CVS.findIndex(c => c.id === id);
    if (index > -1) {
      FAKE_CVS.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }
}
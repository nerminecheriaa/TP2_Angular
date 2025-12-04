import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Cv } from '../models/cv';
import { FAKE_CVS } from '../shared/data/fake-cv';

@Injectable({
  providedIn: 'root'
})
export class FakeCvService {
  private fakeCvsSignal = signal<Cv[]>([...FAKE_CVS]);

  getFakeCvs(): Observable<Cv[]> {
    return of([...this.fakeCvsSignal()]).pipe(delay(800));
  }

  getFakeCvById(id: number): Observable<Cv | undefined> {
    const cv = this.fakeCvsSignal().find(c => c.id === id);
    return of(cv).pipe(delay(500));
  }

  deleteFakeCv(id: number): Observable<boolean> {
    const currentCvs = this.fakeCvsSignal();
    const exists = currentCvs.some(c => c.id === id);
    
    if (exists) {
      const newCvs = currentCvs.filter(c => c.id !== id);
      this.fakeCvsSignal.set(newCvs);
      return of(true).pipe(delay(500));
    }
    
    return of(false).pipe(delay(500));
  }
}
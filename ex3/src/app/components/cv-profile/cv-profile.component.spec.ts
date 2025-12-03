import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvProfileComponent } from './cv-profile.component';

describe('CvProfileComponent', () => {
  let component: CvProfileComponent;
  let fixture: ComponentFixture<CvProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

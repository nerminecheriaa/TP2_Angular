import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbauchesListComponent } from './embauches-list.component';

describe('EmbauchesListComponent', () => {
  let component: EmbauchesListComponent;
  let fixture: ComponentFixture<EmbauchesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbauchesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmbauchesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

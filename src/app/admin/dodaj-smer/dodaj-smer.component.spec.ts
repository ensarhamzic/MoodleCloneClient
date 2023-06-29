import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DodajSmerComponent } from './dodaj-smer.component';

describe('DodajSmerComponent', () => {
  let component: DodajSmerComponent;
  let fixture: ComponentFixture<DodajSmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DodajSmerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DodajSmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrijaveComponent } from './prijave.component';

describe('PrijaveComponent', () => {
  let component: PrijaveComponent;
  let fixture: ComponentFixture<PrijaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrijaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrijaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

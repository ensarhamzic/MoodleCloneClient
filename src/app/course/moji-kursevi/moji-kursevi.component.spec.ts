import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MojiKurseviComponent } from './moji-kursevi.component';

describe('MojiKurseviComponent', () => {
  let component: MojiKurseviComponent;
  let fixture: ComponentFixture<MojiKurseviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MojiKurseviComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MojiKurseviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

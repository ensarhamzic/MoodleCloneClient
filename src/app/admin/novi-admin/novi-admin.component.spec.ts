import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoviAdminComponent } from './novi-admin.component';

describe('NoviAdminComponent', () => {
  let component: NoviAdminComponent;
  let fixture: ComponentFixture<NoviAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoviAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoviAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeBarberDialogComponent } from './change-barber-dialog.component';

describe('ChangeBarberDialogComponent', () => {
  let component: ChangeBarberDialogComponent;
  let fixture: ComponentFixture<ChangeBarberDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeBarberDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeBarberDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

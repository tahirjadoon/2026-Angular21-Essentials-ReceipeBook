import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastCustom } from './toast-custom';

describe('ToastCustom', () => {
  let component: ToastCustom;
  let fixture: ComponentFixture<ToastCustom>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastCustom],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastCustom);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

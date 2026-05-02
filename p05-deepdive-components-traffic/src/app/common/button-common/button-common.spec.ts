import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonCommon } from './button-common';

describe('ButtonCommon', () => {
  let component: ButtonCommon;
  let fixture: ComponentFixture<ButtonCommon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonCommon],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonCommon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNewTask } from './user-new-task';

describe('UserNewTask', () => {
  let component: UserNewTask;
  let fixture: ComponentFixture<UserNewTask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserNewTask],
    }).compileComponents();

    fixture = TestBed.createComponent(UserNewTask);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

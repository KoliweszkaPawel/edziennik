import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGradeForm } from './new-grade-form';

describe('NewGradeForm', () => {
  let component: NewGradeForm;
  let fixture: ComponentFixture<NewGradeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGradeForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGradeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

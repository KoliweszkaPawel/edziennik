import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesTable } from './grades-table';

describe('GradesTable', () => {
  let component: GradesTable;
  let fixture: ComponentFixture<GradesTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradesTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradesTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

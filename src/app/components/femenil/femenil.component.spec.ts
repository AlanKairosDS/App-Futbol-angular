import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FemenilComponent } from './femenil.component';

describe('FemenilComponent', () => {
  let component: FemenilComponent;
  let fixture: ComponentFixture<FemenilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FemenilComponent]
    });
    fixture = TestBed.createComponent(FemenilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

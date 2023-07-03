import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LigaComponent } from './liga.component';

describe('LigaComponent', () => {
  let component: LigaComponent;
  let fixture: ComponentFixture<LigaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LigaComponent]
    });
    fixture = TestBed.createComponent(LigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

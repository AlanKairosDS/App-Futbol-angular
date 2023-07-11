import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaronilComponent } from './varonil.component';

describe('VaronilComponent', () => {
  let component: VaronilComponent;
  let fixture: ComponentFixture<VaronilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaronilComponent]
    });
    fixture = TestBed.createComponent(VaronilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

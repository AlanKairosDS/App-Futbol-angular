import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FutbolistasComponent } from './futbolistas.component';

describe('FutbolistasComponent', () => {
  let component: FutbolistasComponent;
  let fixture: ComponentFixture<FutbolistasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FutbolistasComponent]
    });
    fixture = TestBed.createComponent(FutbolistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

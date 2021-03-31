import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColHeaderEditComponent } from './col-header-edit.component';

describe('ColHeaderEditComponent', () => {
  let component: ColHeaderEditComponent;
  let fixture: ComponentFixture<ColHeaderEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColHeaderEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColHeaderEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

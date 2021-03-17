import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadDialogComponentComponent } from './download-dialog-component.component';

describe('DownloadDialogComponentComponent', () => {
  let component: DownloadDialogComponentComponent;
  let fixture: ComponentFixture<DownloadDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadDialogComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

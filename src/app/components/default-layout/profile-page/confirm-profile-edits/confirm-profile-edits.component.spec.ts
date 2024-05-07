import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmProfileEditsComponent } from './confirm-profile-edits.component';

describe('ConfirmProfileEditsComponent', () => {
  let component: ConfirmProfileEditsComponent;
  let fixture: ComponentFixture<ConfirmProfileEditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmProfileEditsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmProfileEditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

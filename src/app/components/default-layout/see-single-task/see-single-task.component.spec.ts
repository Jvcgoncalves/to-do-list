import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeSingleTaskComponent } from './see-single-task.component';

describe('SeeSingleTaskComponent', () => {
  let component: SeeSingleTaskComponent;
  let fixture: ComponentFixture<SeeSingleTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeSingleTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeeSingleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

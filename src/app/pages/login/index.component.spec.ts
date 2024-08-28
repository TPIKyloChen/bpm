import { TestBed, type ComponentFixture } from '@angular/core/testing';

import { IndexComponent } from './index.component';

describe('LoginComponent', () => {
  let component: IndexComponent, fixture: ComponentFixture<IndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

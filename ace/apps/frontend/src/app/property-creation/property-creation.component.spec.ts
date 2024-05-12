import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyCreationComponent } from './property-creation.component';

describe('PropertyCreationComponent', () => {
  let component: PropertyCreationComponent;
  let fixture: ComponentFixture<PropertyCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyCreationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

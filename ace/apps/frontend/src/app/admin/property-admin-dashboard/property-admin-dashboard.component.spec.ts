import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyAdminDashboardComponent } from './property-admin-dashboard.component';

describe('PropertyAdminDashboardComponent', () => {
  let component: PropertyAdminDashboardComponent;
  let fixture: ComponentFixture<PropertyAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyAdminDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

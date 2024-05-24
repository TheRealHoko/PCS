import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceDashboardComponent } from './service-dashboard.component';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

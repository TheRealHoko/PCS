import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderAdminDashboardComponent } from './provider-admin-dashboard.component';

describe('ProviderComponent', () => {
  let component: ProviderAdminDashboardComponent;
  let fixture: ComponentFixture<ProviderAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderAdminDashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProviderFormComponent } from './providerForm.component';

describe('ProviderComponent', () => {
  let component: ProviderFormComponent;
  let fixture: ComponentFixture<ProviderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProviderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProviderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

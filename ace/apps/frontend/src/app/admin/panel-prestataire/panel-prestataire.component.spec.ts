import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelPrestataireComponent } from './panel-prestataire.component';

describe('PanelPrestataireComponent', () => {
  let component: PanelPrestataireComponent;
  let fixture: ComponentFixture<PanelPrestataireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelPrestataireComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PanelPrestataireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

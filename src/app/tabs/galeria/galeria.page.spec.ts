import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { Galeria } from './galeria.page';

describe('Galeria', () => {
  let component: Galeria;
  let fixture: ComponentFixture<Galeria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Galeria],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Galeria);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

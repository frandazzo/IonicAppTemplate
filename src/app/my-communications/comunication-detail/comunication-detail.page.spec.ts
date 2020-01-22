import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComunicationDetailPage } from './comunication-detail.page';

describe('ComunicationDetailPage', () => {
  let component: ComunicationDetailPage;
  let fixture: ComponentFixture<ComunicationDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicationDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComunicationDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

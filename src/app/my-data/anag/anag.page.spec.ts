import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AnagPage } from './anag.page';

describe('AnagPage', () => {
  let component: AnagPage;
  let fixture: ComponentFixture<AnagPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnagPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AnagPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

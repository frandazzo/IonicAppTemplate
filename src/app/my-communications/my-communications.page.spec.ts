import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyCommunicationsPage } from './my-communications.page';

describe('MyCommunicationsPage', () => {
  let component: MyCommunicationsPage;
  let fixture: ComponentFixture<MyCommunicationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCommunicationsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyCommunicationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

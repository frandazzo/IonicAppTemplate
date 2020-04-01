import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TestroutingPage } from './testrouting.page';

describe('TestroutingPage', () => {
  let component: TestroutingPage;
  let fixture: ComponentFixture<TestroutingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestroutingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TestroutingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

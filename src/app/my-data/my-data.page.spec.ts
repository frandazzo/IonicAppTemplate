import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyDataPage } from './my-data.page';

describe('MyDataPage', () => {
  let component: MyDataPage;
  let fixture: ComponentFixture<MyDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

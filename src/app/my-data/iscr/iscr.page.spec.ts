import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { IscrPage } from './iscr.page';

describe('IscrPage', () => {
  let component: IscrPage;
  let fixture: ComponentFixture<IscrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IscrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(IscrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

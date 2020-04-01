import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { T2Page } from './t2.page';

describe('T2Page', () => {
  let component: T2Page;
  let fixture: ComponentFixture<T2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ T2Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(T2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

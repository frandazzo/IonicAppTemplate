import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TesttabPage } from './testtab.page';

describe('TesttabPage', () => {
  let component: TesttabPage;
  let fixture: ComponentFixture<TesttabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesttabPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TesttabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

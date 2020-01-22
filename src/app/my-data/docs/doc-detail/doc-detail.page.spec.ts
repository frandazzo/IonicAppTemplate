import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DocDetailPage } from './doc-detail.page';

describe('DocDetailPage', () => {
  let component: DocDetailPage;
  let fixture: ComponentFixture<DocDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DocDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

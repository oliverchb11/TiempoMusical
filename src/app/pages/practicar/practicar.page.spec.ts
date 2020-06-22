import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PracticarPage } from './practicar.page';

describe('PracticarPage', () => {
  let component: PracticarPage;
  let fixture: ComponentFixture<PracticarPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticarPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreategroupPage } from './creategroup.page';

describe('CreategroupPage', () => {
  let component: CreategroupPage;
  let fixture: ComponentFixture<CreategroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreategroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreategroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

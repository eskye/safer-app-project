import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppLayoutPage } from './app-layout.page';

describe('AppLayoutPage', () => {
  let component: AppLayoutPage;
  let fixture: ComponentFixture<AppLayoutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLayoutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppLayoutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

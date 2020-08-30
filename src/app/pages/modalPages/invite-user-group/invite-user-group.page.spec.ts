import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InviteUserGroupPage } from './invite-user-group.page';

describe('InviteUserGroupPage', () => {
  let component: InviteUserGroupPage;
  let fixture: ComponentFixture<InviteUserGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteUserGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InviteUserGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

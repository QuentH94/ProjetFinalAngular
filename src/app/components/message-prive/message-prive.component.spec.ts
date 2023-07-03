import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePriveComponent } from './message-prive.component';

describe('MessagePriveComponent', () => {
  let component: MessagePriveComponent;
  let fixture: ComponentFixture<MessagePriveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagePriveComponent]
    });
    fixture = TestBed.createComponent(MessagePriveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

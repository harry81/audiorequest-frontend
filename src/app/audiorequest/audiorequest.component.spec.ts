import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiorequestComponent } from './audiorequest.component';

describe('AudiorequestComponent', () => {
  let component: AudiorequestComponent;
  let fixture: ComponentFixture<AudiorequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiorequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiorequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

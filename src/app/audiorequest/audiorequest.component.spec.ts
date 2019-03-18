import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatGridListModule, MatDialogModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AudiorequestComponent } from './audiorequest.component';

describe('AudiorequestComponent', () => {
  let component: AudiorequestComponent;
  let fixture: ComponentFixture<AudiorequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AudiorequestComponent ],
        imports: [HttpClientTestingModule, MatGridListModule, MatProgressSpinnerModule, MatDialogModule]
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

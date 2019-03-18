import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { NotifyDialogComponent } from './notify-dialog.component';

describe('NotifyDialogComponent', () => {
    let component: NotifyDialogComponent;
    let fixture: ComponentFixture<NotifyDialogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ NotifyDialogComponent ],
            imports: [BrowserAnimationsModule, MatSelectModule, FormsModule, MatDialogModule, MatInputModule],
            providers: [{provide : MatDialogRef, useValue : {}},
                        { provide: MAT_DIALOG_DATA, useValue: [] }]

        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotifyDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

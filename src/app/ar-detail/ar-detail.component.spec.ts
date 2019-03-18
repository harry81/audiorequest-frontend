import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule, MatGridListModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { ArDetailComponent } from './ar-detail.component';

describe('ArDetailComponent', () => {
    let component: ArDetailComponent;
    let fixture: ComponentFixture<ArDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ArDetailComponent ],
            imports: [RouterTestingModule, HttpClientTestingModule,
                      MatCardModule, MatGridListModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ArDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

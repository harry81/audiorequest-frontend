import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule, MatCheckboxModule, MatInputModule,
        MatListModule, MatMenuModule, MatIconModule, MatCardModule, MatGridListModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AudiorequestComponent } from './audiorequest/audiorequest.component';
import { IntroComponent } from './intro/intro.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [
        AppComponent,
        AudiorequestComponent,
        IntroComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, MatToolbarModule, MatMenuModule, MatIconModule, MatCardModule, MatGridListModule,
        FormsModule, ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

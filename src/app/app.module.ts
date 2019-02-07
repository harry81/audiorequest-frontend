import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {MatButtonModule, MatCheckboxModule, MatInputModule} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AudiorequestComponent } from './audiorequest/audiorequest.component';



@NgModule({
    declarations: [
        AppComponent,
        AudiorequestComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatButtonModule, MatCheckboxModule, MatInputModule,
        FormsModule, ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

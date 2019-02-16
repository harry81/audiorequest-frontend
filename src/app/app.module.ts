import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, Injectable } from "@angular/core";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Sentry from "@sentry/browser";

Sentry.init({
  dsn: "https://3305151b8ee54156ab7b82c0bddd6735@sentry.io/1395538"
});

import {MatButtonModule, MatCheckboxModule, MatInputModule,
        MatListModule, MatMenuModule, MatIconModule, MatCardModule, MatGridListModule, MatDialogModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AudiorequestComponent } from './audiorequest/audiorequest.component';
import { IntroComponent } from './intro/intro.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NotifyDialogComponent } from './notify-dialog/notify-dialog.component';


@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
    declarations: [
        AppComponent,
        AudiorequestComponent,
        IntroComponent,
        NotifyDialogComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        NgbModule,
        MatProgressBarModule, MatProgressSpinnerModule,
        MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, MatToolbarModule,
        MatMenuModule, MatIconModule, MatCardModule, MatGridListModule, MatDialogModule,
        FormsModule, ReactiveFormsModule
    ],
    entryComponents: [NotifyDialogComponent],
    providers: [{ provide: ErrorHandler, useClass: SentryErrorHandler }],
    bootstrap: [AppComponent]
})
export class AppModule { }
